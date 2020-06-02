import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import {
  Observable,
  throwError as observableThrowError,
} from 'rxjs';
import {
  catchError,
  retry,
} from 'rxjs/operators';

import { GlobalErrorHandlerService } from './global-error-handler.service';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';

  constructor(
    private globalErrorHandlerService: GlobalErrorHandlerService,
  ) { }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }
    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 0:
          case 500:
            this.globalErrorHandlerService.handleError(error);
            break;
          case 401:
            // TODO: Add retry logic
            this.globalErrorHandlerService.handleError(error);
            break;
          case 403:
            this.globalErrorHandlerService.handleError(error);
            break;
          default:
            break;
        }

        return observableThrowError(error);
      }),
    );
  }

  private addAuthenticationToken<T>(request: HttpRequest<T>): HttpRequest<T> {
    const token = localStorage.getItem('token');
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!token) {
      return request;
    }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, `Bearer ${token}`),
    });
  }
}
