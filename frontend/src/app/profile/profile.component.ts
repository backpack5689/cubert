import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  signedIn: boolean = false;

  constructor(
	private route: ActivatedRoute,
  private router: Router,
  
  ) {}

  ngOnInit(): void {
    this.signedIn = sessionStorage.getItem("_id") !== null;
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
