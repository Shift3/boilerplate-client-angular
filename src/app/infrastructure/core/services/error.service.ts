import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { Logger } from '@utils/logger';
import { IMessage, Message } from '@models/message';
import { ISentryConfig, SentryConfig } from '@models/error';
import { SentryErrorHandlerService } from './sentry-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private sentryErrorHandlerService: SentryErrorHandlerService) {}
  public getClientMessage(error: Error): IMessage[] {
    const errorList: Message[] = [];
    if (!navigator.onLine) {
      errorList.push(new Message({ message: 'noInternet' }));
      return errorList;
    }
    error.message
      ? errorList.push(new Message({ message: error.message }))
      : errorList.push(new Message({ message: error.toString() }));
    return errorList;
  }

  public getServerMessage(error: HttpErrorResponse): IMessage[] {
    const errorList: Message[] = [];
    if (error && error.error) {
      errorList.push(
        new Message({ type: 'dynamic', message: error.error.message }),
      );
    } else {
      errorList.push(new Message({ message: 'unableToCompleteRequest' }));
    }
    return errorList;
  }

  public setErrorStateWhenUnknown(
    error: Error | HttpErrorResponse,
    sentryConfig: ISentryConfig = new SentryConfig(),
  ): ISentryConfig {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 500:
          sentryConfig.message = new Message({ message: 'serverError' });
          sentryConfig.sendToSentry = true;
          sentryConfig.showDialog = true;
          break;
        case 0:
          if (navigator.onLine) {
            sentryConfig.message = new Message({
              message: 'noServerConnection',
            });
            sentryConfig.sendToSentry = true;
            sentryConfig.showDialog = true;
          } else {
            sentryConfig.message = new Message({ message: 'noInternet' });
          }
          break;
        case 403:
          sentryConfig.message = new Message({ message: 'forbidden' });
          sentryConfig.sendToSentry = true;
          break;
        case 404:
          sentryConfig.message = new Message({ message: 'notFound' });
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
