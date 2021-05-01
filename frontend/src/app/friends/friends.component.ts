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

  constructor(
	private route: ActivatedRoute,
	private apiService: ApiService,
	private router: Router,
  ) {}

  ngOnInit(): void {
	  this.signedIn = sessionStorage.getItem("_id") !== null;
	  if (this.signedIn) {
		  this.apiService.getUserFriends(sessionStorage.getItem("_id")).subscribe((data) => {
              if (data != null)
                this.userFriends = data;
		  });
	  }
  }

  addFriend(): void {
    let usernameinput = (document.getElementById("username") as HTMLInputElement).value;
	this.apiService.findUser(usernameinput).subscribe((data) => {
		if(data == "") {
        	alert("Could not find the user");
      	}else{
		  	//alert("found the user");
			  //add friendo
        	this.apiService.addFriend(sessionStorage.getItem("_id"), data[0]._id).subscribe();
			//sessionStorage.setItem("_id", data._id);
			//this.router.navigate(['/timer']);
      	}
	});
	this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	  this.router.onSameUrlNavigation = 'reload';
	  this.router.navigate([this.router.url]);
  }
  
  goToStats(friend_id: string): void {
      sessionStorage.setItem("_statId", friend_id);
      this.router.navigate(["stats"]);
  }


  // --------------------------------------------------------------------

  // Log out
  logOut(): void {
	  sessionStorage.removeItem("_id");
      sessionStorage.removeItem("_statId");
	  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	  this.router.onSameUrlNavigation = 'reload';
	  this.router.navigate(['timer']);
  }

}
