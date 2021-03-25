import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AgencyDetailPresentationComponent } from './agency/agency-detail/agency-detail-presentation.component';
import { AgencyDetailSmartComponent } from './agency/agency-detail/agency-detail-smart.component';
import { AgencyListPresentationComponent } from './agency/agency-list/agency-list-presentation.component';
import { AgencyListSmartComponent } from './agency/agency-list/agency-list-smart.component';
import { AgencyTableComponent } from './agency/agency-table/agency-table.component';
import { UserDetailSmartComponent } from './users/user-detail/user-detail-smart.component';
import { UserDetailPresentationComponent } from './users/user-detail/user-detail-presentation.component';
import { UserListPresentationComponent } from './users/user-list/user-list-presentation.component';
import { UserListSmartComponent } from './users/user-list/user-list-smart.component';
import { UserTableComponent } from './users/user-list/user-table/user-table.component';

import {
  IRoutingAdminTranslationKey,
  RoutingAdminTranslationKey,
} from '@models/translation/routing';
import { UpdateProfileOrUserGuard } from '@core/guards/update-profile-or-user.guard';

import { resolverList } from '@core/resolvers';

const adminRoutingTranslationKeys: IRoutingAdminTranslationKey = new RoutingAdminTranslationKey();
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
        data: {
          title: adminRoutingTranslationKeys.createUser,
        },
        resolve: {
          agencyList: resolverList.GetAgencyListResolver,
          roleList: resolverList.GetRoleListResolver,
          user: resolverList.CreateUserResolver,
        },
      },
      {
        path: 'update-user/:id',
        component: UserDetailSmartComponent,
        data: {
          title: adminRoutingTranslationKeys.updateUser,
        },
        canActivate: [UpdateProfileOrUserGuard],
        resolve: {
          agencyList: resolverList.GetAgencyListResolver,
          roleList: resolverList.GetRoleListResolver,
          user: resolverList.UpdateUserResolver,
        },
      },
      {
        path: 'user-list',
        component: UserListSmartComponent,
        data: { title: adminRoutingTranslationKeys.userList },
      },
      {
        path: 'agency-list',
        component: AgencyListSmartComponent,
        data: { title: adminRoutingTranslationKeys.agencyList },
      },
      {
        path: 'create-agency',
        component: AgencyDetailSmartComponent,
        data: {
          title: adminRoutingTranslationKeys.createAgency,
        },
        resolve: {
          agency: resolverList.CreateAgencyResolver,
        },
      },
      {
        path: 'update-agency/:id',
        component: AgencyDetailSmartComponent,
        data: {
          title: adminRoutingTranslationKeys.updateAgency,
        },
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
export class AdminRoutingModule {}

export const components = [
  AdminLayoutComponent,
  AgencyDetailSmartComponent,
  AgencyDetailPresentationComponent,
  AgencyListPresentationComponent,
  AgencyListSmartComponent,
  UserDetailPresentationComponent,
  UserDetailSmartComponent,
  AgencyTableComponent,
  UserListPresentationComponent,
  UserListSmartComponent,
  UserTableComponent,
];
