import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserDetailSmartComponent } from './users/user-detail/user-detail-smart.component';
import { UserDetailPresentationComponent } from './users/user-detail/user-detail-presentation.component';
import { UserListPresentationComponent } from './users/user-list/user-list-presentation.component';
import { UserListSmartComponent } from './users/user-list/user-list-smart.component';
import { UserTableComponent } from './users/user-list/user-table/user-table.component';

import { resolverList } from '@core/resolvers';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full',
      },
      {
        path: 'create-user',
        component: UserDetailSmartComponent,
        data: { title: 'Create User' },
        resolve: {
          user: resolverList.CreateUserResolver,
        },
      },
      {
        path: 'user-list',
        component: UserListSmartComponent,
        data: { title: 'User List' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const components = [
  AdminLayoutComponent,
  UserDetailPresentationComponent,
  UserDetailSmartComponent,
  UserListPresentationComponent,
  UserListSmartComponent,
  UserTableComponent,
];
