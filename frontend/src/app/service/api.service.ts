import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
	baseUri: string = 'http://3.131.25.140:4000/api';
	headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

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
	  return this.http.get(`${this.baseUri}`);
  }

  // Login
  loginUser(username, password): Observable<any> {
    dbPass = this.http.get(`/login`); // Fetches the password stored in the Database
    if(md5(password) == dbPass){
      return sessionID;
    }
    return 0;


    return this.http.post(`${this.baseUri}/login`);
  }
}
