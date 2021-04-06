import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Observable, of as observableOf } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { LanguageStateService } from '../services/state/language-state.service';
import { Message } from '@models/message';
import { NotificationService } from '../services/notification.service';
import {
  INotificationTranslationKey,
  NotificationTranslationKey,
} from '@models/translation/notification';

@Injectable({
  providedIn: 'root',
})
export class HasValidLanguageGuard implements CanActivate {
  constructor(
    private languageStateService: LanguageStateService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const languageCode: string = route.params.languageCode;
    return observableOf(
      this.languageStateService.isAvailableLanguageCode(languageCode),
    ).pipe(
      take(1),
      tap((isValidLanguageCode) => {
        if (!isValidLanguageCode) {
          this.navigateOnError();
        }
      }),
    );
  }

  private navigateOnError(): void {
    const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();
    const message: Message = new Message({
      message: notificationTranslationKeys.unableToLoadRequestedLanguage,
    });
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/content/agent-list');
  }
}
