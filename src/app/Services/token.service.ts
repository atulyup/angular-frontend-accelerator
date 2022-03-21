import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  ACCESS_TOKEN = 'access_token';
  REFRESH_TOKEN = 'refresh_token';

  constructor() { }
  
  public getApiKey() {
    return '123456789'
  }
  getToken() {
    return localStorage.getItem(this.ACCESS_TOKEN)||'123456';
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN)|| '543221';
  }

  saveToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
