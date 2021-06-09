import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { Logger } from '@utils/logger';
import { IMessage, Message } from '@models/message';
import {
  INotificationTranslationKey,
  NotificationTranslationKey,
} from '@models/translation/notification';
import { ISentryConfig, SentryConfig } from '@models/error';
import { SentryErrorHandlerService } from './sentry-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private sentryErrorHandlerService: SentryErrorHandlerService) {}
  public getClientMessage(error: Error): IMessage[] {
    const errorList: Message[] = [];
    const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();

    if (!navigator.onLine) {
      errorList.push(
        new Message({ message: notificationTranslationKeys.noInternet }),
      );
      return errorList;
    }

    error.message
      ? errorList.push(
          new Message({ message: notificationTranslationKeys[error.message] }),
        )
      : errorList.push(
          new Message({
            message: notificationTranslationKeys[error.toString()],
          }),
        );
    return errorList;
  }

  public getServerMessage(error: HttpErrorResponse): IMessage[] {
    const errorList: Message[] = [];
    const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();

    if (error && error.error) {
      const messageList: Message[] = error.error.message
        .split(';')
        .map((message) => {
          return new Message({ message });
        });
      errorList.push(...messageList);
      // errorList.push(new Message({ message: error.error.message }));
    } else {
      errorList.push(
        new Message({
          message: notificationTranslationKeys.unableToCompleteRequest,
        }),
      );
    }
    return errorList;
  }

  public setErrorStateWhenUnknown(
    error: Error | HttpErrorResponse,
    sentryConfig: ISentryConfig = new SentryConfig(),
  ): ISentryConfig {
    if (error instanceof HttpErrorResponse) {
      const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();

      switch (error.status) {
        case 500:
          sentryConfig.message = new Message({
            message: notificationTranslationKeys.serverError,
          });
          sentryConfig.sendToSentry = true;
          sentryConfig.showDialog = true;
          break;
        case 0:
          if (navigator.onLine) {
            sentryConfig.message = new Message({
              message: notificationTranslationKeys.noServerConnection,
            });
            sentryConfig.sendToSentry = true;
            sentryConfig.showDialog = true;
          } else {
            sentryConfig.message = new Message({
              message: notificationTranslationKeys.noInternet,
            });
          }
          break;
        case 403:
          sentryConfig.message = new Message({
            message: notificationTranslationKeys.forbidden,
          });
          sentryConfig.sendToSentry = true;
          break;
        case 404:
          sentryConfig.message = new Message({
            message: notificationTranslationKeys.notFound,
          });
          break;
      }
    }

    return sentryConfig;
  }

  public logError(
    error: Error | HttpErrorResponse,
    sentryConfig: ISentryConfig = new SentryConfig(),
    errorMessageList: string[] = [],
  ): void {
    if (!environment.production) {
      Logger.error(error);
    }
    if (environment.sentry.enabled) {
      this.sentryErrorHandlerService.handleError(
        error,
        sentryConfig.showDialog,
        errorMessageList,
      );
    }
  }

  public convertMessageToMessageList(message: IMessage): IMessage[] {
    const messageList: IMessage[] = [];
    messageList.push(message);
    return messageList;
  }
}
