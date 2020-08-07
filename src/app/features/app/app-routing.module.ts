import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@/core/guards/auth.guard';
import { AdminAuthGuard } from '@/core/guards/admin-auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

// TODO: See if this can be tied into existing logic while still being static for compilation.
/**
 * This variable sets the default route when navigating to the bare app route.
 * It does not handle auth.
 */
const role = JSON.parse(localStorage.getItem('user'))?.role?.roleName;
const redirectRoute = (role === 'Admin' || role === 'Super Administrator')
  ? '/admin'
  : '/content';

const routes: Routes = [
  {
    path: '',
    redirectTo: redirectRoute,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
    loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'content',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('../content/content.module').then((m) => m.ContentModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
