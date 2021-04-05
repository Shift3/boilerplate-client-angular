import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Message } from '@models/message';
import {
  INotificationTranslationKey,
  NotificationTranslationKey,
} from '@models/translation/notification';
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
  ) {}

  public canActivate(): Observable<boolean> {
    return this.userStateService.checkRoleList().pipe(
      take(1),
      map((checkRole) => checkRole.canEdit),
      tap((canEdit) => {
        if (!canEdit) {
          const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();
          const message: Message = new Message({
            message:
              notificationTranslationKeys.cannotViewPageReturnToDashboard,
          });
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
