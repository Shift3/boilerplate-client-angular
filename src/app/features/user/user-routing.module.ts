import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangePasswordPresentationComponent } from './change-password/change-password-presentation.component';
import { ChangePasswordSmartComponent } from './change-password/change-password-smart.component';
import { UserDetailSmartComponent } from '../admin/users/user-detail/user-detail-smart.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

import {
  IRoutingUserTranslationKey,
  RoutingUserTranslationKey,
} from '@models/translation/routing';
import { resolverList } from '@core/resolvers';

const userRoutingTranslationKeys: IRoutingUserTranslationKey = new RoutingUserTranslationKey();
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
        data: { title: userRoutingTranslationKeys.changePassword },
        resolve: {
          user: resolverList.GetLoggedInUserResolver,
        },
      },
      {
        path: 'profile',
        component: UserDetailSmartComponent,
        data: {
          title: userRoutingTranslationKeys.profile,
        },
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
  UserLayoutComponent,
  ChangePasswordPresentationComponent,
  ChangePasswordSmartComponent,
];
