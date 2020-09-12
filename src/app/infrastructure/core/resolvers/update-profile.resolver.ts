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
  take,
} from 'rxjs/operators';

import { IUserDTO } from '@models/user';
import { NotificationService } from '../services/notification.service';
import { UserStateService } from '../services/state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileResolver implements Resolve<IUserDTO> {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private userStateService: UserStateService,
  ) { }
    resolve(): Observable<IUserDTO> {
      return this.userStateService.getUserSession().pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          this.navigateOnError();
          return observableThrowError(error);
        }),
      );
    }

  private navigateOnError(): void {
    const message = 'Unable to load profile. Returning to the dashboard.';
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/content/agent-list');
  }
}
