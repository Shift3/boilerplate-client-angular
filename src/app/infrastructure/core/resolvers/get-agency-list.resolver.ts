import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Resolve, Router } from '@angular/router';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';

import { AgencyService } from '../services/api/agency.service';
import { IAgencyDTO } from '@models/agency';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/api/user.service';
import { UserStateService } from '../services/state/user-state.service';

/**
 * Returns the server-provided list of agencies for Super Administrators, or the assigned agency for Admins.
 */
@Injectable({
  providedIn: 'root',
})
export class GetAgencyListResolver implements Resolve<IAgencyDTO[]> {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private agencyService: AgencyService,
    private userService: UserService,
    private userStateService: UserStateService,
  ) {}

  resolve(): Observable<IAgencyDTO[]> {
    return this.userStateService.checkRoleList().pipe(
      take(1),
      mergeMap((roleList) => {
        if (roleList.isSuperAdmin) {
          return this.agencyService.getAgencyList();
        } else {
          return this.userStateService.getUserSession().pipe(
            take(1),
            mergeMap((loggedInUser) =>
              this.userService.findUser(loggedInUser.id),
            ),
            map((user) => [user.agency]),
          );
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.navigateOnError();
        return observableThrowError(error);
      }),
    );
  }

  private navigateOnError(): void {
    const message: string = 'unableToLoadAgencies';
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/admin/user-list');
  }
}
