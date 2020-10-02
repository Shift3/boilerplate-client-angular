import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './error.service';
import { NotificationService } from './notification.service';
import { ISentryConfig } from '@models/error';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  private errorService = this.injector.get(ErrorService);

  constructor(public injector: Injector) {}

  public handleError(error: Error | HttpErrorResponse): void {
    const sentryConfig: ISentryConfig = this.errorService.setErrorStateWhenUnknown(
      error,
    );
    let errorMessage: string[] | string;

    if (error instanceof HttpErrorResponse) {
      // Server error
      errorMessage =
        sentryConfig.message || this.errorService.getServerMessage(error);
      this.notifyAndLogMessage(error, errorMessage, sentryConfig);
    } else {
      // Client Error
      sentryConfig.sendToSentry = true;
      sentryConfig.showDialog = true;
      errorMessage = this.errorService.getClientMessage(error);
      this.notifyAndLogMessage(error, errorMessage, sentryConfig);
    }
  }

  private notifyAndLogMessage(
    error: Error | HttpErrorResponse,
    errorMessage: string[] | string,
    sentryConfig: ISentryConfig,
  ): void {
    const notifier = this.injector.get(NotificationService);
    if (typeof errorMessage === 'string') {
      errorMessage = this.errorService.convertStringMessageToList(errorMessage);
    }
    notifier.showError(errorMessage);
    if (sentryConfig.sendToSentry) {
      this.errorService.logError(error, sentryConfig, errorMessage);
    }
  }
}
