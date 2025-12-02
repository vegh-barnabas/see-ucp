import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { OverlaySpinnerService } from '@shared/overlay-spinner/overlay-spinner.service';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private overlaySpinner: OverlaySpinnerService,
  ) {}

  public logout() {
    // todo: add snackbar to show on login screen after logout
    // todo: style snackbar component
    setTimeout(() => {
      this.overlaySpinner.show();

      this.authService.logout();
      this.router.navigate(['/login']);
    }, 3000);
  }
}
