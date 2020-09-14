import { Injectable } from '@angular/core';

import {
  Observable,
  of as observableOf,
} from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';

import { ApiService } from './api.service';
import { environment } from '@env/environment';
import {
  IChangeUserRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
  IUserDTO,
} from '@models/user';
import { IMessage } from '@models/message';
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
        const message = 'The password was reset successfully.';
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

  public getUserList(): Observable<IUserDTO[]> {
    const endpoint = `${this.url}`;

    return this.apiService.get<IUserDTO[]>(endpoint);
  }

  public createUser(payload: IChangeUserRequest): Observable<IUserDTO> {
    const endpoint = `${this.url}`;
    payload.role.id = Number(payload.role.id);

    return this.apiService.post<IUserDTO, IChangeUserRequest>(endpoint, payload).pipe(
      tap((response) => {
        const message = `An email has been sent to ${response.email} with instructions to finish activating the account.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }

  public findUser(id: number): Observable<IUserDTO> {
    const endpoint = `${this.url}/${id}`;

    return this.apiService.get<IUserDTO>(endpoint);
  }

  public updateUser(payload: IChangeUserRequest, userId: number): Observable<IUserDTO> {
    const endpoint = `${this.url}/${userId}`;
    payload.role.id = Number(payload.role.id);

    return this.apiService.put<IUserDTO, IChangeUserRequest>(endpoint, payload).pipe(
      tap(() => {
        const message = `User updated.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }

  public deleteUser(user: IUserDTO): Observable<IUserDTO> {
    const endpoint = `${this.url}/${user.id}`;

    return this.apiService.delete<IUserDTO>(endpoint).pipe(
      tap(() => {
        const message = `User ${user.firstName} ${user.lastName} deleted.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }

  public resendActivationEmail(user: IUserDTO): Observable<never> {
    const endpoint = `${this.url}/resend-activation-email/${user.id}`;

    return this.apiService.get<never>(endpoint).pipe(
      tap(() => {
        const message = `A new activation email was sent to ${user.firstName} ${user.lastName}.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }
}
