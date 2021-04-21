import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from './../service/api.service';

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
	private apiService: ApiService,
	private router: Router,
  ) {}

  ngOnInit(): void {
  }
  
  onAddPost(): void {
  }

  onAddPost(): void {
    let usernameinput = (document.getElementById("username") as HTMLInputElement).value;
    let passwordinput = (document.getElementById("password") as HTMLInputElement).value;
	  this.apiService.loginUser(usernameinput, passwordinput).subscribe((data) => {
		  if(data._id < 0)
      {
        alert("Account unavailable.");
      }else{
        sessionStorage.setItem("_id", data._id);
		this.router.navigate(['/timer']);
      }
	  });
  }

}
