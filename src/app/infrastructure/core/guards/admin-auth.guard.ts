import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import {
  map,
  take,
  tap,
} from 'rxjs/operators';

import { NotificationService } from '../services/notification.service';
import { UserStateService } from '../services/state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private userStateService: UserStateService,
  ) { }

  public canActivate(): Observable<boolean> {
    return this.userStateService.checkRoleGuard().pipe(
      take(1),
      map((checkRole) => checkRole.isAdmin),
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
