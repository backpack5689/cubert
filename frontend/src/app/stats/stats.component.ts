import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { delay } from 'rxjs/operators';

import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
    
    @ViewChild('canvas', {static: true })
    canvas?: ElementRef<HTMLCanvasElement>;
    
    userTimes: any = [];
    signedIn: boolean = false;
    statChart?: Chart;

  constructor(
	private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
  ) {}
  

  ngOnInit(): void {
      Chart.register(...registerables);
	  this.signedIn = sessionStorage.getItem("_statId") !== null;
	  if (this.signedIn) {
          // Fetch all of the user's times
		  this.apiService.getUserTimes(sessionStorage.getItem("_statId")).subscribe((data) => {
			  this.userTimes = data;
              this.makeChart();
      });
	  }
  }

  makeChart(): void {
    // Generate graph x-axis labels
    let labels = [];
    for (let i = 1; i <= this.userTimes.length; i++) {
      labels.push(i);
      }
      
      // Get actual times from this.userTimes
      let times = [];
      for (let i = 0; i < this.userTimes.length; i++) {
        let strTime = this.userTimes[i].time_completetime;
        let minSec = strTime.split(":");
        let secMill = minSec[1].split(".");
        
        let minute = minSec[0];
        let second = secMill[0];
        let milli = secMill[1];
        
        let timeInSeconds = (+minute * 60) + (+second) + (+milli / 1000);
        times.push(timeInSeconds);
      }
      
      // Set up chart
      let data = {
        labels: labels,
        datasets: [{
          label: "Times (in seconds)",
          data: times,
          fill: false,
          borderColor: 'rgb(0, 0, 0)',
          backgroundColor: 'rgb(255, 0, 0)',
          tension: 0.1
        }]
      };
      
      if (this.canvas !== undefined) {
        console.log("Hello");
        const chart: Chart = new Chart(this.canvas.nativeElement, {
          type: 'line', data: data
        });
        
        this.statChart = chart;
      }
  }
  
  ngOnDestroy(): void {
      let userId = sessionStorage.getItem("_id");
      if (userId !== null)
        sessionStorage.setItem("_statId", userId);
  }
  
  importScramble(friend_scramble: string): void {
      sessionStorage.setItem("scramble", friend_scramble);
      this.router.navigate(["timer"]);
  }

  // Log out
  logOut(): void {
	  sessionStorage.removeItem("_id");
      sessionStorage.removeItem("_statId");
	  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	  this.router.onSameUrlNavigation = 'reload';
	  this.router.navigate(['timer']);
  }

}
