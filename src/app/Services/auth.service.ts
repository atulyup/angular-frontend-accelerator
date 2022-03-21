import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  OAUTH_CLIENT = 'express-client';
  OAUTH_SECRET = 'express-secret';
  API_URL = 'http://localhost:3000/';

  constructor(private tokenService: TokenService, private http: HttpClient) {

  }

  login(username: string, password: string) {
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(this.OAUTH_CLIENT + ':' + this.OAUTH_SECRET)
      })
    };
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    this.http.post(this.API_URL + 'oauth/token', body, HTTP_OPTIONS).subscribe(result => {
      // Insert Access Token & Refresh Token
      this.tokenService.saveToken(JSON.stringify(result));
      this.tokenService.saveRefreshToken(JSON.stringify(result));
    }, (error) => {
      this.handleError(error);
    })
  }

  refreshToken(refreshData: any) {

    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(this.OAUTH_CLIENT + ':' + this.OAUTH_SECRET)
      })
    };
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');

    this.http.post(this.API_URL + 'oauth/token', body, HTTP_OPTIONS).subscribe(result => {
      // Insert Refresh Token & Refresh Token
      this.tokenService.saveToken(JSON.stringify(result));
      this.tokenService.saveRefreshToken(JSON.stringify(result));
    }, (error) => {
      this.handleError(error);
    });
  }



  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }



  sendTestAPI(){
    this.http.get('http://localhost:5000/').subscribe(data=>{
      console.log("Data received from Flask Application", data)
    })
  }


}
