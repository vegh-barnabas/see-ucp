import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  public open(
    message: string,
    action = '',
    config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    },
  ): void {
    this.snackbar.open(message, action, config);
  }
}
