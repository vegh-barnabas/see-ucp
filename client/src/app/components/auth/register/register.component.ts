import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AuthService, RegisterUser } from '../auth.service';

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

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });

  constructor(private authService: AuthService) {}

  public getMockResponse() {
    this.authService.getMockResponse().subscribe(console.log);
  }

  public onSubmit() {
    console.warn(this.registerForm.value);
  }

  public register(user?: RegisterUser) {
    if (!user) user = { username: 'bolha', password: 'alma', email: 'bolha@example.com' };

    return this.authService.register(user).subscribe(console.log);
  }
}
