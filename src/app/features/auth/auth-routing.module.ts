import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginPresentationComponent } from './login/login-presentation.component';
import { LoginSmartComponent } from './login/login-smart.component';
import { LogoutComponent } from './logout/logout.component';
import { SignUpPresentationComponent } from './sign-up/sign-up-presentation.component';
import { SignUpSmartComponent } from './sign-up/sign-up-smart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginSmartComponent,
    data: { title: 'Login' },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: 'Logged Out' },
  },
  {
    path: 'signup',
    component: SignUpSmartComponent,
    data: { title: 'Sign Up' },
  },
];

/**
 * Lazy loaded module for all auth-related routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }

export const components = [
  AuthLayoutComponent,
  LoginPresentationComponent,
  LoginSmartComponent,
  LogoutComponent,
  SignUpPresentationComponent,
  SignUpSmartComponent,
];
