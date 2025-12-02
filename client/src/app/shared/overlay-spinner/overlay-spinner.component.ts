import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-overlay-spinner',
  imports: [MatProgressSpinner],
  template: '<mat-spinner diameter="160"></mat-spinner>',
})
export class OverlaySpinnerComponent {}
