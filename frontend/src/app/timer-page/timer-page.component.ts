import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.css']
})
export class TimerPageComponent implements OnInit {

  userTimes: any = [];
  signedIn: boolean = false;
  
  // Timer variables
  displayedTime: string = "00:00.000"; // This variable is actually displayed on the page
  interval: number = 0;
  isOn: boolean = false;
  offset: number = new Date().getTime();
  time: number = 0;
  
  // Scramble variables
  scramble: string = ""; // This variable is actually displayed on the page
  minRotations = 8;
  maxRotations = 16;
  possibleRotations: string[] = ["F ", "R ", "U ", "L ", "B ", "D ", "F' ", "R' ", "U' ", "L' ", "B' ", "D' ", "F2 ", "R2 ", "U2 ", "L2 ", "B2 ", "D2 "];
  
  constructor(
	private route: ActivatedRoute,
	private apiService: ApiService,
	private router: Router,
  ) {}

  ngOnInit(): void {
	  this.signedIn = sessionStorage.getItem("_id") !== null;
	  if (this.signedIn) {
		  this.apiService.getUserTimes(sessionStorage.getItem("_id")).subscribe((data) => {
			  this.userTimes = data;
		  });
	  }
  }
  
  // Timer Code ------------------------------------------------------
  startTimer(): void {
	  if(this.isOn === false) {
		  this.interval = setInterval(this.update.bind(this), 25);
		  this.offset = new Date().getTime();
		  this.isOn = true;
	  }
  }
  
  stopTimer(): void {
	  if(this.isOn === true) {
		  clearInterval(this.interval);
		  this.interval = 0;
		  this.isOn = false;
	  }
  }
  
  resetTimer(): void {
	  this.apiService.addTime(sessionStorage.getItem("_id"), { time_scramble: this.scramble, time_completedate: new Date(), time_completetime: this.displayedTime, user_id: sessionStorage.getItem("_id") }).subscribe();
	  this.apiService.getUserTimes(sessionStorage.getItem("_id")).subscribe((data) => {
			  this.userTimes = data;
		  });
	  this.time = 0;
	  this.update();
  }
  
  update(): void {
	  if(this.isOn) {
		  this.time += this.delta();
	  }
	  
	  this.displayedTime = this.format(this.time);
  }
  
  delta(): number {
	  let now = new Date().getTime();
	  let timePassed = now - this.offset;
	  this.offset = now;
	  return timePassed;
  }
  
  format(rawTime: number): string {
	  let dTime = new Date(rawTime);
	  let minutes = dTime.getMinutes().toString();
	  let seconds = dTime.getSeconds().toString();
	  let milliseconds = dTime.getMilliseconds().toString();
	  
	  if(minutes.length < 2) {
		  minutes = '0' + minutes;
	  }
	  if(seconds.length < 2) {
		  seconds = '0' + seconds;
	  }
	  while(milliseconds.length < 3) {
		  milliseconds = '0' + milliseconds;
	  }
	  
	  return minutes + ":" + seconds + "." + milliseconds;
  }
  
  // --------------------------------------------------------------------
  
  // Scramble Code ------------------------------------------------------
  generateScramble(): void {
	  this.scramble = "";
	  let numMoves = Math.random() * (this.maxRotations - this.minRotations) + this.minRotations;
	  let numPossibleRotations = this.possibleRotations.length;
	  for (let i = 0; i < numMoves; i++) {
		  this.scramble += this.possibleRotations[Math.floor(Math.random() * numPossibleRotations)];
	  }
  }
  
  // --------------------------------------------------------------------
  
  // Log out
  logOut(): void {
	  sessionStorage.removeItem("_id");
      sessionStorage.removeItem("_statId");
	  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	  this.router.onSameUrlNavigation = 'reload';
	  this.router.navigate([this.router.url]);
  }

}
