import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackbarService } from '@shared/snackbar.service';

import { timer } from 'rxjs';

import * as Auth from '@global/auth';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
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

  public loading = false;

  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router,
  ) {}

  public onSubmit() {
    if (this.loginForm.invalid) return;

    const loginUser: Auth.LoginUser = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };

    this.login(loginUser);
  }

  public login(user: Auth.LoginUser) {
    if (this.loading) return;

    this.loading = true;

    console.log('Login with', user);

    const request = this.authService.login(user);
    const minTime = timer(1500);

    request.subscribe({
      next: () => {
        minTime.subscribe(() => {
          this.loading = false;
          this.router.navigate(['/'], { state: { message: 'Login successful!' } });
        });
      },
      error: (err) => {
        minTime.subscribe(() => {
          this.loading = false;
          this.snackbarService.open(err.error?.error);
        });
      },
    });
  }

  // Form field getters
  public get username() {
    return this.loginForm.get('username');
  }

  public get password() {
    return this.loginForm.get('password');
  }
}
