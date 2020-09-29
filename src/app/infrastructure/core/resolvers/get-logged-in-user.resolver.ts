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
  mergeMap,
  take,
} from 'rxjs/operators';

import { IUserDTO } from '@models/user';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/api/user.service';
import { UserStateService } from '../services/state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class GetLoggedInUserResolver implements Resolve<IUserDTO> {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private userService: UserService,
    private userStateService: UserStateService,
  ) { }
    resolve(): Observable<IUserDTO> {
      return this.userStateService.checkRoleList()
        .pipe(
          take(1),
          mergeMap((roleList) => this.userStateService.getUserSession().pipe(
            take(1),
            mergeMap((loggedInUser) => (roleList.isAdmin)
              ? this.userService.findUser(loggedInUser.id)
              : this.userService.findProfile(loggedInUser.id)),
          )),
          catchError((error: HttpErrorResponse) => {
            this.navigateOnError();
            return observableThrowError(error);
          }),
        );
    }

  private navigateOnError(): void {
    const message = 'Unable to load user information. Returning to the dashboard.';
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/content/agent-list');
  }
}
