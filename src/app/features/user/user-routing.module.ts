import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivateAccountPresentationComponent } from './activate-account/activate-account-presentation.component';
import { ActivateAccountSmartComponent } from './activate-account/activate-account-smart.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
  },
  {
    path: 'activate-account/:token',
    component: ActivateAccountSmartComponent,
    data: { title: 'Activate Account' },
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
  ActivateAccountPresentationComponent,
  ActivateAccountSmartComponent,
  UserLayoutComponent,
];
