import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import * as Auth from '@global/auth';

import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    },
    { updateOn: 'submit' },
  );

  private router = inject(Router);

  constructor(private authService: AuthService) { }

  public onSubmit() {
    if (this.loginForm.invalid) return;

    console.warn(this.loginForm.value);

    const loginUser: Auth.LoginUser = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };

    this.login(loginUser);
  }

  public login(user: Auth.LoginUser) {
    return this.authService.login(user).subscribe(() =>
      this.router.navigate(['/home']));
  }

  // Form field getters
  public get username() {
    return this.loginForm.get('username');
  }

  public get password() {
    return this.loginForm.get('password');
  }
}
