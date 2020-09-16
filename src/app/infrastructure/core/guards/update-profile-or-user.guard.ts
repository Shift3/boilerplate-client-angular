import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';

import {
  Observable,
  throwError as observableThrowError,
} from 'rxjs';
import {
  catchError,
  map,
  take,
  tap,
} from 'rxjs/operators';

import { NotificationService } from '../services/notification.service';
import { UserStateService } from '../services/state/user-state.service';

/**
 * Navigate to the `profile` route when given the logged in user id. Otherwise, allow navigation to the `update-user` route.
 */
@Injectable({
  providedIn: 'root',
})
export class UpdateProfileOrUserGuard implements CanActivate {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private userStateService: UserStateService,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id: number = +route.params.id;
    return this.userStateService.isSelf(id).pipe(
      take(1),
      tap(isSelf => {
        if (isSelf) {
          this.router.navigateByUrl('/user/profile');
        }
      }),
      map(isSelf => !isSelf),
      catchError((error: Error) => {
        this.navigateOnError();
        return observableThrowError(error);
      }),
    );
  }

  private navigateOnError(): void {
    const message = 'Unable to load user information. Returning to the dashboard.';
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/admin/user-list');
  }
}
