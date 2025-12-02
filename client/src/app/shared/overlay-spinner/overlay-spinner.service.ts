import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { OverlaySpinnerComponent } from './overlay-spinner.component';

@Injectable({ providedIn: 'root' })
export class OverlaySpinnerService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  public show(): void {
    if (this.overlayRef) return;

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'overlay',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    this.overlayRef.attach(new ComponentPortal(OverlaySpinnerComponent));
  }

  public hide(): void {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }
}
