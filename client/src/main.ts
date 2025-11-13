import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
import { AuthInterceptor } from 'app/components/auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(AppRoutes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
}).catch((err) => console.error(err));
