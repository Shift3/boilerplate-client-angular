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

import {
  IRoutingAuthTranslationKey,
  RoutingAuthTranslationKey,
} from '@models/translation/routing';

const authRoutingTranslationKeys: IRoutingAuthTranslationKey = new RoutingAuthTranslationKey();
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
        data: { title: authRoutingTranslationKeys.activateAccount },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordSmartComponent,
        data: { title: authRoutingTranslationKeys.forgotPassword },
      },
      {
        path: 'login',
        component: LoginSmartComponent,
        data: { title: authRoutingTranslationKeys.login },
      },
      {
        path: 'logout',
        component: LogoutComponent,
        data: { title: authRoutingTranslationKeys.logout },
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordSmartComponent,
        data: { title: authRoutingTranslationKeys.resetPassword },
      },
      {
        path: 'signup',
        component: SignUpSmartComponent,
        data: { title: authRoutingTranslationKeys.signUp },
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
