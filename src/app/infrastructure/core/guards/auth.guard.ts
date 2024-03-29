import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { NotificationService } from '../services/notification.service';
import { UserStateService } from '../services/state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private userStateService: UserStateService,
  ) {}

  public canActivate(): Observable<boolean> {
    return this.userStateService.checkRoleList().pipe(
      take(1),
      map((checkRole) => checkRole.isValid),
      tap((isLoggedInUser) => {
        if (!isLoggedInUser) {
          const message =
            'You cannot view the requested page. Returning to the login page.';
          this.notificationService.showError([message]);
          this.router.navigateByUrl('/auth');
        }
      }),
    );
  }

  public canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
