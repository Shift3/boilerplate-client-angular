import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailSmartComponent } from '../admin/users/user-detail/user-detail-smart.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

import { resolverList } from '@core/resolvers';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children : [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: UserDetailSmartComponent,
        data: { title: 'Update Profile' },
        resolve: {
          roleList: resolverList.GetOwnRoleListResolver,
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
export class UserRoutingModule { }

export const components = [
  UserLayoutComponent,
];
