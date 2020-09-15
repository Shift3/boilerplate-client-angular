import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
    Resolve,
    Router,
} from '@angular/router';

import {
  Observable,
  throwError as observableThrowError,
} from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  take,
} from 'rxjs/operators';

import { IRoleDTO } from '@models/role';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/api/user.service';
import { UserStateService } from '../services/state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class GetOwnRoleListResolver implements Resolve<IRoleDTO[]> {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private userService: UserService,
    private userStateService: UserStateService,
  ) { }

  resolve(): Observable<IRoleDTO[]> {
    return this.userStateService.getUserSession().pipe(
      take(1),
      mergeMap((user) => this.userService.findUser(user.id)),
      map((user) => [user.role]),
      catchError((error: HttpErrorResponse) => {
        this.navigateOnError();
        return observableThrowError(error);
      }),
    );
  }

  private navigateOnError(): void {
    const message = 'Unable to load profile. Returning to dashboard.';
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/content/agent-list');
  }
}
