import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  userFriends: any = [];
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
		  this.apiService.getUserFriends(sessionStorage.getItem("_id")).subscribe((data) => {
			  this.userFriends = data;
		  });
	  }
  }

  addFriend(): void {
    let usernameinput = (document.getElementById("username") as HTMLInputElement).value;
	//alert("gonna do the thing");
	this.apiService.findUser(usernameinput).subscribe((data) => {
		//alert(typeof(data));
		if(data == "") {
        	alert("Could not find the user");
      	}else{
		  	alert("found the user");
			  //add friendo
			this.apiService.addFriend(data[0]._id).subscribe();

        //sessionStorage.setItem("_id", data._id);
		//this.router.navigate(['/timer']);
      	}
	});
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
  
  // Log out
  logOut(): void {
	  sessionStorage.removeItem("_id");
	  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	  this.router.onSameUrlNavigation = 'reload';
	  this.router.navigate([this.router.url]);
  }

}
