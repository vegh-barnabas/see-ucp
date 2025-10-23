import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { emailValidator } from '@shared/email-validator.directive';

import * as Auth from '@global/auth';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public forgotPasswordForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator()]),
    },
    { updateOn: 'submit' },
  );

  constructor(private authService: AuthService) {}

  public onSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    console.warn(this.forgotPasswordForm.value);

    const registerUser: Auth.ForgotPasswordUser = {
      username: this.forgotPasswordForm.value.username!,
      email: this.forgotPasswordForm.value.email!,
    };

    this.forgotPassword(registerUser);
  }

  public forgotPassword(user: Auth.ForgotPasswordUser) {
    return this.authService.forgotPassword(user).subscribe(console.log);
  }

  // Form field getters
  public get username() {
    return this.forgotPasswordForm.get('username');
  }

  public get email() {
    return this.forgotPasswordForm.get('email');
  }
}
