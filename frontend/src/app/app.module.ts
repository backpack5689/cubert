import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerPageComponent } from './timer-page/timer-page.component';
import { LoginComponent } from './login/login.component';
import { StatsComponent } from './stats/stats.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './signUp/signUp.component';
import { FriendsComponent } from './friends/friends.component';

import { ApiService } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    TimerPageComponent,
    LoginComponent,
    SignUpComponent,
    StatsComponent,
    ProfileComponent,
    FriendsComponent,
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApiService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
