import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { environment } from '@env/environment';
import {
  IForgotPasswordRequest,
  IResetPasswordRequest,
} from '@models/user';
import { IMessage } from '@app/infrastructure/models/message';
import { NotificationService } from '../notification.service';
import {
  ISignupDTO,
  ISignupRequest,
} from '@models/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private controllerRoute: string = 'users';
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public signUp(payload: ISignupRequest): Observable<ISignupDTO> {
    const endpoint = `${this.url}/signup/`;

    return this.apiService.post<ISignupDTO, ISignupRequest>(endpoint, payload);
  }

  public forgotPassword(payload: IForgotPasswordRequest): Observable<IMessage> {
    const endpoint = `${this.url}/forgot-password/`;

    return this.apiService.post(endpoint, payload);
  }

  public resetPassword(payload: IResetPasswordRequest, token: string): Observable<IMessage> {
    const endpoint = `${this.url}/reset-password/${token}`;

    return this.apiService.put<IMessage, IResetPasswordRequest>(endpoint, payload).pipe(
      tap(() => {
        const message = 'The password was reset successfully. Please log back in.';
        return this.notificationService.showSuccess([message]);
      }),
    );
  }

  public activateAccount(payload: IResetPasswordRequest, token: string): Observable<IMessage> {
    const endpoint = `${this.url}/activate-account/${token}`;

    return this.apiService.put<IMessage, IResetPasswordRequest>(endpoint, payload).pipe(
      tap(() => {
        const message = 'This account has been activated. Please log in.';
        return this.notificationService.showSuccess([message]);
      }),
    );
  }
}
