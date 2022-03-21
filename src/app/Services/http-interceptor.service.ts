import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenService, private authService: AuthService) {

  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<any> {

    const token = this.tokenService.getToken();
    const refreshToken = this.tokenService.getRefreshToken();
    const apiKey = this.tokenService.getApiKey();

    if (token) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    if (!httpRequest.headers.has('Content-type')) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }
    httpRequest = httpRequest.clone({
      headers: httpRequest.headers.set('Accept', 'application/json')
    })
    // return next.handle(httpRequest)
    return next.handle(httpRequest)
      .pipe(catchError((err, caught) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('this should print your error!', err.error);
              this.authService.refreshToken({refresh_token: refreshToken});
              location.reload();
            }
          }
        console.log('Error Occurred');
        console.log(err);
        return throwError(err);
      })) as any;
  }
}


