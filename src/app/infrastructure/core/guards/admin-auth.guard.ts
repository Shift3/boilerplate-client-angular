import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import {
  take,
  tap,
} from 'rxjs/operators';

import { AuthStateService } from '../services/state/auth-state.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authStateService: AuthStateService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  public canActivate(): Observable<boolean> {
    return this.authStateService.isAdmin().pipe(
      take(1),
      tap(isAdmin => {
        if (!isAdmin) {
          const message = 'You cannot view the requested page. Returning to the dashboard.';
          this.notificationService.showError([message]);
          this.router.navigateByUrl('/');
        }
      }),
    );
  }

  public canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
