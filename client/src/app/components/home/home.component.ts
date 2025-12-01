import { Component } from '@angular/core';

import { NavbarComponent } from '../navbar/navbar.component';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  public isLoggedIn() {
    console.log(this.authService.isLoggedIn());
  }
}
