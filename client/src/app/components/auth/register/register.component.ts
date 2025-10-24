import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

import { passwordMatchValidator } from '@shared/password-match-validator.directive';
import { emailValidator } from '@shared/email-validator.directive';

import * as Auth from '@global/auth';

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public hidePassword = true;

  readonly Auth = Auth;

  public registerForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(Auth.USERNAME_MIN_LENGTH),
        Validators.maxLength(Auth.USERNAME_MAX_LENGTH),
      ]),
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(Auth.PASSWORD_MIN_LENGTH),
      ]),
      passwordConfirm: new FormControl('', [passwordMatchValidator('password')]),
    },
    { updateOn: 'submit' },
  );

  constructor(private authService: AuthService) {}

  public onSubmit() {
    if (this.registerForm.invalid) return;

    console.warn(this.registerForm.value);

    const registerUser: Auth.RegisterUser = {
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };

    this.register(registerUser);
  }

  public register(user?: Auth.RegisterUser) {
    if (!user) user = { username: 'bolha', password: 'alma', email: 'bolha@example.com' };

    return this.authService.register(user).subscribe(console.log);
  }

  // Form field getters
  public get username() {
    return this.registerForm.get('username');
  }

  public get email() {
    return this.registerForm.get('email');
  }

  public get password() {
    return this.registerForm.get('password');
  }

  public get passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }
}
