import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { Logger } from '@utils/logger';
import { Message } from '@models/message';
import { ISentryConfig, SentryConfig } from '@models/error';
import { SentryErrorHandlerService } from './sentry-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private sentryErrorHandlerService: SentryErrorHandlerService) {}
  public getClientMessage(error: Error): Message[] {
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

  public getServerMessage(error: HttpErrorResponse): Message[] {
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
          sentryConfig.message = 'Server Error';
          sentryConfig.sendToSentry = true;
          sentryConfig.showDialog = true;
          break;
        case 0:
          if (navigator.onLine) {
            sentryConfig.message = 'Connection to servers is not available.';
            sentryConfig.sendToSentry = true;
            sentryConfig.showDialog = true;
          } else {
            sentryConfig.message = 'No Internet Connection.';
          }
          break;
        case 403:
          sentryConfig.message =
            'You do not have permission to view the selected page.';
          sentryConfig.sendToSentry = true;
          break;
        case 404:
          sentryConfig.message = 'Not found.';
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

  public convertStringMessageToList(message: string): Message[] {
    const messageList: Message[] = [];
    messageList.push(new Message({ message }));
    return messageList;
  }
}
