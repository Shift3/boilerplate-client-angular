import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangeEmailPresentationComponent } from './change-email/change-email-presentation.component';
import { ChangeEmailSmartComponent } from './change-email/change-email-smart.component';
import { ChangePasswordPresentationComponent } from './change-password/change-password-presentation.component';
import { ChangePasswordSmartComponent } from './change-password/change-password-smart.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileDetailPresentationComponent } from './user-profile-detail/user-profile-detail-presentation.component';
import { UserProfileDetailSmartComponent } from './user-profile-detail/user-profile-detail-smart.component';

import { resolverList } from '@core/resolvers';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'change-password',
        component: ChangePasswordSmartComponent,
        data: { title: 'Change Password' },
        resolve: {
          user: resolverList.GetLoggedInUserResolver,
        },
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: { title: 'Update Profile' },
        resolve: {
          user: resolverList.GetLoggedInUserResolver,
        },
      },
    ],
  },
];

/**
 * Lazy loaded module for all user-related routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

export const components = [
  ChangeEmailPresentationComponent,
  ChangeEmailSmartComponent,
  ChangePasswordPresentationComponent,
  ChangePasswordSmartComponent,
  UserLayoutComponent,
  UserProfileComponent,
  UserProfileDetailPresentationComponent,
  UserProfileDetailSmartComponent,
];
