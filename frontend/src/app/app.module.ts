import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerPageComponent } from './timer-page/timer-page.component';
import { LoginComponent } from './login/login.component';
import { StatsComponent } from './stats/stats.component';
import { ProfileComponent } from './profile/profile.component';

import { ApiService } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    TimerPageComponent,
    LoginComponent,
    StatsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    AppRoutingModule,
	FormsModule
  ],
  providers: [ApiService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
