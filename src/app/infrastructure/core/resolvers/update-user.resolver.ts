import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { IUserDTO } from '@models/user';
import { UserService } from '../services/api/user.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserResolver implements Resolve<IUserDTO> {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private userService: UserService,
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IUserDTO> {
    const id: number = route.params.id;
    return this.userService.findUser(id).pipe(
      take(1),
      catchError((error: HttpErrorResponse) => {
        this.navigateOnError();
        return observableThrowError(error);
      }),
    );
  }

  private navigateOnError(): void {
    const message = 'Unable to load user. Returning to user list.';
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/admin/user-list');
  }
}
