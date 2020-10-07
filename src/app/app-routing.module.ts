import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { AdminAuthGuard } from '@core/guards/admin-auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoleType } from '@models/role';

// TODO: See if this can be tied into existing logic while still being static for compilation.
const role: RoleType = JSON.parse(localStorage.getItem('user'))?.role?.roleName;
// TODO2: Try to figure out the failure in programmatically navigating to the bare routes and implement a better solution
// than hard coding the default routes.
/**
 * This variable sets the default route when navigating to the bare app route (in a logged-in state).
 * It does not handle auth.
 */
let redirectRoute = '';
if (role === 'Admin' || role === 'Super Administrator') {
  redirectRoute = '/admin/user-list';
} else if (role) {
  redirectRoute = '/content/agent-list';
} else {
  redirectRoute = '/auth/login';
}

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
export class AppRoutingModule {}

export const components = [NotFoundComponent];
