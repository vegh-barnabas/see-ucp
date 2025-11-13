import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import * as Auth from '@global/auth';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private accessToken: string | null = null;

  private setAccessToken(token: string) {
    this.accessToken = token;
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public register(user: Auth.RegisterUser) {
    return this.http.post('/api/register', user);
  }

  public forgotPassword(user: Auth.ForgotPasswordUser) {
    return this.http.post('/api/forgot-password', user);
  }

  public login(user: Auth.LoginUser) {
    return this.http
      .post<{ token: string }>('/api/login', user)
      .pipe(tap((response) => this.setAccessToken(response.token)));
  }
}
