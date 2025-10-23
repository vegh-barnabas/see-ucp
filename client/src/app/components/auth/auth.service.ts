import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import * as Auth from '@global/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  public register(user: Auth.RegisterUser) {
    return this.http.post('/api/register', user);
  }
}
