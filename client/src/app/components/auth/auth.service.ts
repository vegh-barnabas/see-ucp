import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// todo make this interface shared
export interface RegisterUser {
  username: string;
  password: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  public getMockResponse() {
    return this.http.get('/api/');
  }

  public register(user: RegisterUser) {
    return this.http.post('/api/register', user);
  }
}
