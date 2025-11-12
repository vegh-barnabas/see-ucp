import { Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotFoundComponent } from './components/auth/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from './components/auth/auth.guard';
import { LoginRedirectGuard } from './components/auth/login-redirect.guard';

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginRedirectGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoginRedirectGuard] },
  { path: '**', component: NotFoundComponent, data: { errorCode: 404 } },
];
