import { Injectable } from '@angular/core';

import * as Sentry from '@sentry/browser';

import { environment } from '@env/environment';

Sentry.init({
  dsn: environment.sentry.DSN,
  environment: environment.name,
  release: `${environment.name}@${environment.version}`,
  // TODO: Evaluate for false negatives.
  integrations(integrations) {
    return integrations.filter((i) => i.name !== 'TryCatch');
  },
});

@Injectable({
  providedIn: 'root',
})
export class SentryErrorHandlerService {
  public handleError(
    error: any,
    showDialog: boolean = false,
    errorMessageList: string[] = [],
  ): void {
    Sentry.configureScope((scope) => {
      if (errorMessageList.length) {
        scope.setExtra('Error Context', errorMessageList[0]);
      }
    });
    const eventId = Sentry.captureException(error.originalError || error);
    if (showDialog && environment.sentry.dialogEnabled) {
      Sentry.showReportDialog({ eventId });
    }
  }
}
