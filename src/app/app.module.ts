import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginModule } from './components/auth/login/login.module';
import { RegisterModule } from './components/auth/register/register.module';
import { NotFoundModule } from './components/auth/not-found/not-found.module';
import { ForgotPasswordModule } from './components/auth/forgot-password/forgot-password.module';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotFoundComponent } from './components/auth/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', component: NotFoundComponent, data: { errorCode: 404 } },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    LoginModule,
    RegisterModule,
    NotFoundModule,
    ForgotPasswordModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
