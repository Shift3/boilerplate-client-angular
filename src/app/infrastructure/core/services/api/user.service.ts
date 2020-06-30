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

  public forgotPassword(payload: IForgotPasswordRequest): Observable<IMessage> {
    const endpoint = `${this.url}/forgot-password/`;

    return this.apiService.post(endpoint, payload);
  }

  public resetPassword(payload: IResetPasswordRequest, token: string): Observable<IMessage> {
    const endpoint = `${this.url}/reset-password/${token}`;

    return this.apiService.put<IMessage, IResetPasswordRequest>(endpoint, payload).pipe(
      tap((response) => this.notificationService.showSuccess([response.message])),
    );
  }
}