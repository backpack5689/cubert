import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';
import { Time } from '@angular/common';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  testinglocally:number = 1;
  baseUri:string = '';
	headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
      if(this.testinglocally == 1) {
        this.baseUri = 'http://localhost:4000/api';
      } else {
        this.baseUri = 'http://3.131.25.140:4000/api';
      }
    }

	// Error handling
	errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // Get all users
  getUsers(): Observable<any> {
	  return this.http.get(`${this.baseUri}/user`);
  }

  // Login
  loginUser(username: string, password: string): Observable<any> {
    let hashword = Md5.hashStr(password);
    let dbPass = this.http.post(`${this.baseUri}/user/login`, { username, hashword });
  	return dbPass;
  }

  // Create User
  createUser(username: string, firstname: string, lastname: string, password: string): Observable<any> {
    let hashword = Md5.hashStr(password);
    return this.http.post(`${this.baseUri}/user/create`, { username, firstname, lastname, hashword });
	
  }

  // Pull all time associated with a specific user
  getUserTimes(user_id: string | null): Observable<any> {
    return this.http.get(`${this.baseUri}/time/${user_id}`);
  }

  // Pull all friends associated with a specific user
  getUserFriends(user_id: string | null): Observable<any> {
    return this.http.get(`${this.baseUri}/user/friends/${user_id}`);
  }

  // Pull all friends associated with a specific user
  findUser(user_fname: string | null): Observable<any> {
    alert("plop");
    return this.http.get(`${this.baseUri}/user/find/${user_fname}`);
  }

  // Adds a time to the time database
  addTime(user_id: string | null, time: any): Observable<any> {
    return this.http.post(`${this.baseUri}/time/create`, { user_id, time });
  }
}
