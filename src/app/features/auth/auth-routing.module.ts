import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivateAccountPresentationComponent } from './activate-account/activate-account-presentation.component';
import { ActivateAccountSmartComponent } from './activate-account/activate-account-smart.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ForgotPasswordPresentationComponent } from './forgot-password/forgot-password-presentation.component';
import { ForgotPasswordSmartComponent } from './forgot-password/forgot-password-smart.component';
import { LoginPresentationComponent } from './login/login-presentation.component';
import { LoginSmartComponent } from './login/login-smart.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPasswordSmartComponent } from './reset-password/reset-password-smart.component';
import { ResetPasswordPresentationComponent } from './reset-password/reset-password-presentation.component';
import { SignUpPresentationComponent } from './sign-up/sign-up-presentation.component';
import { SignUpSmartComponent } from './sign-up/sign-up-smart.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'activate-account/:token',
        component: ActivateAccountSmartComponent,
        data: { title: 'Activate Account' },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordSmartComponent,
        data: { title: 'Forgot Password' },
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
        path: 'reset-password/:token',
        component: ResetPasswordSmartComponent,
        data: { title: 'Reset Password' },
      },
      {
        path: 'signup',
        component: SignUpSmartComponent,
        data: { title: 'Sign Up' },
      },
    ],
  },
];

/**
 * Lazy loaded module for all auth-related routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

export const components = [
  ActivateAccountPresentationComponent,
  ActivateAccountSmartComponent,
  AuthLayoutComponent,
  ForgotPasswordPresentationComponent,
  ForgotPasswordSmartComponent,
  LoginPresentationComponent,
  LoginSmartComponent,
  LogoutComponent,
  ResetPasswordSmartComponent,
  ResetPasswordPresentationComponent,
  SignUpPresentationComponent,
  SignUpSmartComponent,
];
