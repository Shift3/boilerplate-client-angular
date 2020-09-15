import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AgencyDetailPresentationComponent } from './agency/agency-detail/agency-detail-presentation.component';
import { AgencyDetailSmartComponent } from './agency/agency-detail/agency-detail-smart.component';
import { AgencyTableComponent } from './agency/agency-table/agency-table.component';
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
          roleList: resolverList.GetRoleListResolver,
          user: resolverList.CreateUserResolver,
        },
      },
      {
        path: 'update-user/:id',
        component: UserDetailSmartComponent,
        data: { title: 'Update User' },
        resolve: {
          roleList: resolverList.GetRoleListResolver,
          user: resolverList.UpdateUserResolver,
        },
      },
      {
        path: 'user-list',
        component: UserListSmartComponent,
        data: { title: 'User List' },
      },
      {
        path: 'create-agency',
        component: AgencyDetailSmartComponent,
        data: { title: 'Add Agency' },
        resolve: {
          agency: resolverList.CreateAgencyResolver,
        },
      },
      {
        path: 'update-agency/:id',
        component: AgencyDetailSmartComponent,
        data: { title: 'Update Agency' },
        resolve: {
          agency: resolverList.UpdateAgencyResolver,
        },
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
  AgencyDetailSmartComponent,
  AgencyDetailPresentationComponent,
  UserDetailPresentationComponent,
  UserDetailSmartComponent,
  AgencyTableComponent,
  UserListPresentationComponent,
  UserListSmartComponent,
  UserTableComponent,
];
