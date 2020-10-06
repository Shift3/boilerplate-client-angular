import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './api/auth.service';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';

  constructor(private authService: AuthService, private router: Router) {}

  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }
    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            // TODO: Add retry logic
            this.logoutOnAuthError();
            break;
          case 403:
            this.logoutOnAuthError();
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

  /**
   * Initial naive behavior for 401s and 403s.
   */
  private logoutOnAuthError(): void {
    this.authService.resetToken();
    this.authService.clearSession();
    this.router.navigateByUrl('/auth');
  }
}
