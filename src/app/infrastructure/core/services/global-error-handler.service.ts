import {
  ErrorHandler,
  Injectable,
  Injector,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '@env/environment';
import { ErrorService } from './error.service';
import { Logger } from '@utils/logger';
import { NotificationService } from './notification.service';
import { SentryErrorHandlerService } from './sentry-error-handler.service';
import {
  ISentryConfig,
  SentryConfig,
} from '@models/error';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    public injector: Injector,
  ) { }

  public handleError(
    error: Error | HttpErrorResponse,
    message: string = '',
    sentryConfig: ISentryConfig = new SentryConfig(),
  ): void {
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(NotificationService);
    const sentryErrorHandler = this.injector.get(SentryErrorHandlerService);

    let errorMessage: string[] | string;
    if (error instanceof HttpErrorResponse) {
      // Server error
      if (!errorService.getServerMessage(error).length) {
        // Set error message in cases where server does not supply one
        switch (error.status) {
          case 500:
            message = 'Server Error';
            sentryConfig.sendToSentry = true;
            sentryConfig.showDialog = true;
            break;
          case 0:
            if (navigator.onLine) {
              message = 'Connection to servers is not available.';
              sentryConfig.sendToSentry = true;
              sentryConfig.showDialog = true;
            } else {
              message = 'No Internet Connection.';
            }
            break;
          case 403:
            message = 'You do not have permission to view the selected page.';
            sentryConfig.sendToSentry = true;
            break;
          case 404:
            message = 'Not found.';
            break;
        }
      }
      errorMessage = message || errorService.getServerMessage(error);
      if (typeof errorMessage === 'string') {
        errorMessage = this.convertStringMessageToList(errorMessage);
      }
      notifier.showError(errorMessage);
      if (sentryConfig.sendToSentry) {
        this.logError(sentryErrorHandler, error, sentryConfig, errorMessage);
      }
    } else {
      // Client Error
      sentryConfig.sendToSentry = true;
      sentryConfig.showDialog = true;
      errorMessage = errorService.getClientMessage(error);
      if (typeof errorMessage === 'string') {
        errorMessage = this.convertStringMessageToList(errorMessage);
      }
      notifier.showError(errorMessage);
      this.logError(sentryErrorHandler, error, sentryConfig, errorMessage);
    }
  }

  private logError(
    sentryErrorHandler: SentryErrorHandlerService,
    error: Error | HttpErrorResponse,
    sentryConfig: ISentryConfig = new SentryConfig(),
    errorMessageList: string[] = [],
  ): void {
    if (!environment.production) {
      Logger.error(error);
    }
    if (environment.sentry.enabled) {
      sentryErrorHandler.handleError(
        error,
        sentryConfig.showDialog,
        errorMessageList,
      );
    }
  }

  private convertStringMessageToList(message: string): string[] {
    const messageList: string[] = [];
    messageList.push(message);
    return messageList;
  }
}
