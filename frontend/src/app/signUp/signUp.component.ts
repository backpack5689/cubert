import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
	private route: ActivatedRoute,
	private apiService: ApiService,
	private router: Router,
  ) {}

  ngOnInit(): void {
  }

  signUp(): void {
    let firstnameinput = (document.getElementById("firstname") as HTMLInputElement).value;
    let lastnameinput = (document.getElementById("lastname") as HTMLInputElement).value;
    let usernameinput = (document.getElementById("username") as HTMLInputElement).value;
    let passwordinput = (document.getElementById("password") as HTMLInputElement).value;
	  let confirmpasswordinput = (document.getElementById("confirmpassword") as HTMLInputElement).value;
    if (passwordinput == confirmpasswordinput) {
      this.apiService.createUser(usernameinput, firstnameinput, lastnameinput, passwordinput).subscribe()
      this.router.navigate(['/timer']);
    } else {
      alert("Passwords do not match");
      //this.router.navigate(['/sign']);
    }
    /*this.apiService.loginUser(firstnameinput, passwordinput).subscribe((data) => {
		  if(data._id < 0)
      {
        alert("Account unavailable.");
      }else{
        sessionStorage.setItem("_id", data._id);*/
  }

}
