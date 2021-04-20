import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
  constructor(
	private route: ActivatedRoute,
	private apiService: ApiService,
  ) {}

  ngOnInit(): void {
  }

  onAddPost(): void {
	  this.apiService.loginUser("haha@1234.com", "1234").subscribe((data) => {
		  //this.response = data;
	  });
  }

}
