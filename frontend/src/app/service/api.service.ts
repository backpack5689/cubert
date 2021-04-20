import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
	baseUri: string = 'http://localhost:4000/api';
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
  loginUser(username: string, password: string): Observable<any> {
    let dbPass = this.http.post(`${this.baseUri}/login`, { username, password });
	
	return dbPass;
  }
}
