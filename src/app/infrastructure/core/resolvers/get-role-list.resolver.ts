import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Resolve, Router } from '@angular/router';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { IRoleDTO } from '@models/role';
import { Message } from '@models/message';
import { Notification } from '@models/translation/notification';
import { NotificationService } from '../services/notification.service';
import { RoleService } from '../services/api/role.service';

@Injectable({
  providedIn: 'root',
})
export class GetRoleListResolver implements Resolve<IRoleDTO[]> {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private roleService: RoleService,
  ) {}

  resolve(): Observable<IRoleDTO[]> {
    return this.roleService.getRoleList().pipe(
      take(1),
      catchError((error: HttpErrorResponse) => {
        this.navigateOnError();
        return observableThrowError(error);
      }),
    );
  }

  private navigateOnError(): void {
    const notification = new Notification();
    const message: Message = new Message({
      message: notification.unableToLoadRoles,
    });
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/admin/user-list');
  }
}
