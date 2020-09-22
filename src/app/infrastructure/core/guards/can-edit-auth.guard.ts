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
export class CanEditAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private userStateService: UserStateService,
  ) { }

  public canActivate(): Observable<boolean> {
    return this.userStateService.checkRoleList().pipe(
      take(1),
      map((checkRole) => checkRole.canEdit),
      tap(canEdit => {
        if (!canEdit) {
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
