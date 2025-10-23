import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService, RegisterUser } from '../auth.service';
import { passwordMatchValidator } from '@shared/password-match-validator.directive';

// todo make this shared between server and client
export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 32;
export const PASSWORD_MIN_LENGTH = 8;

import * as Limits from './register.component';

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
  hidePassword = true;

  readonly Limits = Limits;

  registerForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        passwordMatchValidator('password'),
      ]),
    },
    { updateOn: 'submit' },
  );

  constructor(private authService: AuthService) {}

  public getMockResponse() {
    this.authService.getMockResponse().subscribe(console.log);
  }

  public onSubmit() {
    if (this.registerForm.invalid) return;

    console.warn(this.registerForm.value);

    const registerUser: RegisterUser = {
      username: this.registerForm.value.username!,
      email: this.registerForm.value.username!,
      password: this.registerForm.value.username!,
    };

    this.register(registerUser);
  }

  public register(user?: RegisterUser) {
    if (!user) user = { username: 'bolha', password: 'alma', email: 'bolha@example.com' };

    return this.authService.register(user).subscribe(console.log);
  }

  get username() {
    return this.registerForm.get('username');
  }
}
