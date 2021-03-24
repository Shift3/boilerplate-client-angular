import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { AdminAuthGuard } from '@core/guards/admin-auth.guard';
import {
  IRoutingAppTranslationKey,
  RoutingAppTranslationKey,
} from '@models/translation/routing';
import { NotFoundComponent } from './not-found/not-found.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RedirectRouteGuard } from '@core/guards/redirect-route.guard';

const appRoutingTranslationKeys: IRoutingAppTranslationKey = new RoutingAppTranslationKey();
const routes: Routes = [
  {
    path: '',
    component: RedirectComponent,
    canActivate: [RedirectRouteGuard],
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'content',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./features/content/content.module').then((m) => m.ContentModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { title: appRoutingTranslationKeys.notFound },
  },
];

/**
 * Root feature routing module. Loads all lazy loaded routes and root-level routes.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const components = [NotFoundComponent, RedirectComponent];
