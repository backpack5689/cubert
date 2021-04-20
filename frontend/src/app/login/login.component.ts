import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	username: any;
	password: any;

  constructor(
	private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
  }
  
  onAddPost(): void {
  }

}
