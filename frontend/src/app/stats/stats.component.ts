import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
    
    userTimes: any = [];
    signedIn: boolean = false;

  constructor(
	private route: ActivatedRoute,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
	  this.signedIn = sessionStorage.getItem("_statId") !== null;
	  if (this.signedIn) {
		  this.apiService.getUserTimes(sessionStorage.getItem("_statId")).subscribe((data) => {
			  this.userTimes = data;
		  });
	  }
  }
  
  ngOnDestroy(): void {
      let userId = sessionStorage.getItem("_id");
      if (userId !== null)
        sessionStorage.setItem("_statId", userId);
  }

}
