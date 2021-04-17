import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from '@core/services/api/api.service';
import { environment } from '@env/environment';
import {
  IChangeUserSettingRequest,
  IUserSettingDTO,
} from '@app/infrastructure/models/user-setting';
import { IMessage, Message } from '@app/infrastructure/models/message';
import {
  INotificationTranslationKey,
  NotificationTranslationKey,
} from '@models/translation/notification';
import { NotificationService } from '@core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserSettingService {
  private controllerRoute: string = 'user-settings';
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public updateUserSetting(
    payload: IChangeUserSettingRequest,
    userId: number,
  ): Observable<IUserSettingDTO> {
    const endpoint = `${this.url}/${userId}`;

    return this.apiService
      .put<IUserSettingDTO, IChangeUserSettingRequest>(endpoint, payload)
      .pipe(
        tap(() => {
          const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();
          const message: IMessage = new Message({
            message: notificationTranslationKeys.userSettingsUpdated,
          });

          return this.notificationService.showSuccess([message]);
        }),
      );
  }
}
