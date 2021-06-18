import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './error.service';
import { IMessage, Message } from '@models/message';
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
    let errorMessage: IMessage[] | IMessage;

    if (error instanceof HttpErrorResponse) {
      // Server error
      errorMessage = sentryConfig.message.message
        ? [
            new Message({
              message: sentryConfig.message.message,
            }),
          ]
        : this.errorService.getServerMessage(error);

      this.notifyAndLogMessage(error, errorMessage, sentryConfig, true);
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
    errorMessage: IMessage[] | IMessage,
    sentryConfig: ISentryConfig,
    isServerTranslated: boolean = false,
  ): void {
    const notifier = this.injector.get(NotificationService);
    if (!Array.isArray(errorMessage)) {
      errorMessage = this.errorService.convertMessageToMessageList(
        errorMessage,
      );
    }
    notifier.showError(errorMessage, isServerTranslated);
    if (sentryConfig.sendToSentry) {
      this.errorService.logError(
        error,
        sentryConfig,
        errorMessage.map((message) => message.message),
      );
    }
  }
}
