import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'content',
    loadChildren: () => import('../content/content.module').then((m) => m.ContentModule),
  },
  {
    path: 'user',
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { title: 'Not Found' },
  },
];

/**
 * Root feature routing module. Loads all lazy loaded routes and root-level routes.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const components = [
  NotFoundComponent,
];
