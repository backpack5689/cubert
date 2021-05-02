import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Chart, registerables } from 'chart.js';

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
		  });
          
          // Generate graph x-axis labels
          let labels = [];
          for (let i = 1; i <= this.userTimes.length; i++) {
              labels.push(i);
          }
          
          // Get actual times from this.userTimes
          let times = [];
          for (let i = 0; i < this.userTimes.length; i++) {
              times.push(this.userTimes[i].time_scramble);
          }
          
          // Set up chart
          let data = {
              labels: labels,
              datasets: [{
                label: "Times",
                data: times,
                fill: false,
                borderColor: 'rgb(0, 0, 0)',
                tension: 0.1
              }]
          };
          
          if (this.canvas !== undefined) {
              console.log("Hello");
              const chart: Chart = new Chart(this.canvas.nativeElement, {
                  type: 'bar', data: data
              });
              
              this.statChart = chart;
          }
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
