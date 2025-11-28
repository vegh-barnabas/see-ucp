import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { tap } from 'rxjs';

import * as Auth from '@global/auth';

interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private setAccessToken(response: LoginResponse) {
    localStorage.setItem('id_token', response.token);

    // todo fix date bug
    const expiresAt = Date.now() + response.expiresIn * 1000;
    localStorage.setItem('expires_at', String(expiresAt));
  }

  public register(user: Auth.RegisterUser) {
    return this.http.post('/api/register', user);
  }

  public forgotPassword(user: Auth.ForgotPasswordUser) {
    return this.http.post('/api/forgot-password', user);
  }

  public login(user: Auth.LoginUser) {
    return this.http
      .post<LoginResponse>('/api/login', user)
      .pipe(tap((response) => this.setAccessToken(response)));
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    const expiresAt = localStorage.getItem('expires_at');

    console.log(Date.now(), expiresAt);

    if (Date.now() > Number(expiresAt)) return false;

    return true;
  }
}
