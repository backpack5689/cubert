import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerPageComponent } from './timer-page/timer-page.component';
import { LoginComponent } from './login/login.component';
import { StatsComponent } from './stats/stats.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './signUp/signUp.component';
import { FriendsComponent } from './friends/friends.component';

const routes: Routes = [
	{ path: '', redirectTo: 'timer', pathMatch: 'full' },
	{ path: 'timer', component: TimerPageComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'stats', component: StatsComponent },
	{ path: 'signUp', component: SignUpComponent },
	{ path: 'friends', component: FriendsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
