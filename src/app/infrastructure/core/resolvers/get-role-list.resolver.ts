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

import { NotificationService } from '../services/notification.service';
import { RoleService } from '../services/api/role.service';
import { RoleType } from '@models/role';
import { ISelectOptions } from '@models/form/select';

@Injectable({
  providedIn: 'root',
})
export class GetRoleListResolver implements Resolve<ISelectOptions<RoleType>[]> {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private roleService: RoleService,
  ) { }

  resolve(): Observable<ISelectOptions<RoleType>[]> {
    return this.roleService.getRoleList()
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          this.navigateOnError();
          return observableThrowError(error);
        }),
      );
  }

  private navigateOnError(): void {
    const message = 'Unable to load roles. Returning to user list.';
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/admin/user-list');
  }
}
