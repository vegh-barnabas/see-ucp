import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(AppRoutes))],
}).catch((err) => console.error(err));
