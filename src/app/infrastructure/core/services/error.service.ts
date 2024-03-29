import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { Logger } from '@utils/logger';
import { ISentryConfig, SentryConfig } from '@models/error';
import { SentryErrorHandlerService } from './sentry-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private sentryErrorHandlerService: SentryErrorHandlerService) {}
  public getClientMessage(error: Error): string[] {
    const errorList: string[] = [];
    if (!navigator.onLine) {
      errorList.push('No Internet Connection.');
      return errorList;
    }
    error.message
      ? errorList.push(error.message)
      : errorList.push(error.toString());
    return errorList;
  }

  public getServerMessage(error: HttpErrorResponse): string[] {
    const errorList: string[] = [];
    if (error && error.error) {
      errorList.push(error.error.message);
    } else {
      errorList.push('Unable to complete request.');
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

  public convertStringMessageToList(message: string): string[] {
    const messageList: string[] = [];
    messageList.push(message);
    return messageList;
  }
}
