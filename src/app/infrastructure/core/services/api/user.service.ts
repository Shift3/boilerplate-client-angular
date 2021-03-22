import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { environment } from '@env/environment';
import {
  IChangePasswordRequest,
  IChangeUserRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
  IUserDTO,
} from '@models/user';
import { IMessage, Message } from '@models/message';
import { INotification, Notification } from '@models/translation/notification';
import { NotificationService } from '../notification.service';
import { ISessionDTO, ISignupRequest } from '@models/auth';
import { UserStateService } from '../state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private controllerRoute: string = 'users';
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private userStateService: UserStateService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public signUp(payload: ISignupRequest): Observable<IUserDTO> {
    const endpoint = `${this.url}/signup/`;

    return this.apiService
      .post<IUserDTO, ISignupRequest>(endpoint, payload)
      .pipe(
        tap((response) => {
          const notification: INotification = new Notification();
          const messages: Message[] = [
            new Message({ message: notification.activationEmailSent }),
            new Message({ type: 'dynamic', message: response.email }),
          ];
          this.notificationService.showSuccess(messages);
        }),
      );
  }

  public forgotPassword(payload: IForgotPasswordRequest): Observable<IMessage> {
    const endpoint = `${this.url}/forgot-password/`;

    return this.apiService
      .post<IMessage, IForgotPasswordRequest>(endpoint, payload)
      .pipe(
        tap((response) => {
          const message: Message = new Message({
            type: 'dynamic',
            message: response.message,
          }); // setting this dynamic as the message will be received translated from the server
          return this.notificationService.showSuccess([message]);
        }),
      );
  }

  public resetPassword(
    payload: IResetPasswordRequest,
    token: string,
  ): Observable<IUserDTO> {
    const endpoint = `${this.url}/reset-password/${token}`;

    return this.apiService
      .put<IUserDTO, IResetPasswordRequest>(endpoint, payload)
      .pipe(
        tap(() => {
          const notification: INotification = new Notification();
          const message: Message = new Message({
            message: notification.resetPasswordSuccess,
          });
          return this.notificationService.showSuccess([message]);
        }),
      );
  }

  public activateAccount(
    payload: IResetPasswordRequest,
    token: string,
  ): Observable<IUserDTO> {
    const endpoint = `${this.url}/activate-account/${token}`;

    return this.apiService
      .put<IUserDTO, IResetPasswordRequest>(endpoint, payload)
      .pipe(
        tap(() => {
          const notification: INotification = new Notification();
          const message: Message = new Message({
            message: notification.activateAccountSuccess,
          });
          return this.notificationService.showSuccess([message]);
        }),
      );
  }

  public findProfile(userId: number): Observable<IUserDTO> {
    const endpoint = `${this.url}/profile/${userId}`;

    return this.apiService.get<IUserDTO>(endpoint);
  }

  public updateProfile(
    payload: IChangeUserRequest,
    userId: number,
  ): Observable<IUserDTO> {
    const endpoint = `${this.url}/profile/${userId}`;

    return this.apiService
      .put<IUserDTO, IChangeUserRequest>(endpoint, payload)
      .pipe(
        tap((user) => this.userStateService.setUserSession(user)),
        tap(() => {
          const notification: INotification = new Notification();
          const message: Message = new Message({
            message: notification.profileUpdated,
          });
          return this.notificationService.showSuccess([message]);
        }),
      );
  }

  public getUserList(agencyId?: number): Observable<IUserDTO[]> {
    const endpoint = `${this.url}`;
    let params = new HttpParams();
    if (agencyId) {
      params = new HttpParams().set('agencyId', agencyId.toString());
    }
    return this.apiService.get<IUserDTO[]>(endpoint, { params });
  }

  public createUser(payload: IChangeUserRequest): Observable<IUserDTO> {
    const endpoint = `${this.url}`;
    payload.role.id = Number(payload.role.id);

    return this.apiService
      .post<IUserDTO, IChangeUserRequest>(endpoint, payload)
      .pipe(
        tap((response) => {
          const notification: INotification = new Notification();
          const messages: Message[] = [
            new Message({ message: notification.emailSent }),
            new Message({ type: 'dynamic', message: response.email }),
            new Message({ message: notification.instructionToActivate }),
          ];
          return this.notificationService.showSuccess(messages);
        }),
      );
  }

  public findUser(id: number): Observable<IUserDTO> {
    const endpoint = `${this.url}/${id}`;

    return this.apiService.get<IUserDTO>(endpoint);
  }

  /**
   * This lets the logged in user change their own password only.
   */
  public changePassword(
    payload: IChangePasswordRequest,
    userId: number,
  ): Observable<ISessionDTO> {
    const endpoint = `${this.url}/change-password/${userId}`;

    return this.apiService
      .put<ISessionDTO, IChangePasswordRequest>(endpoint, payload)
      .pipe(
        tap((response) => localStorage.setItem('token', response.jwtToken)),
        tap((response) => this.userStateService.setUserSession(response.user)),
        tap((response) => this.authService.setToken(response.jwtToken)),
        tap(() => {
          const notification: INotification = new Notification();
          const message: Message = new Message({
            message: notification.passwordUpdated,
          });
          return this.notificationService.showSuccess([message]);
        }),
      );
  }

  public updateUser(
    payload: IChangeUserRequest,
    userId: number,
  ): Observable<IUserDTO> {
    const endpoint = `${this.url}/${userId}`;
    payload.role.id = Number(payload.role.id);

    return this.apiService
      .put<IUserDTO, IChangeUserRequest>(endpoint, payload)
      .pipe(
        tap(() => {
          const notification: INotification = new Notification();
          const message: Message = new Message({
            message: notification.userUpdated,
          });
          return this.notificationService.showSuccess([message]);
        }),
      );
  }

  public deleteUser(user: IUserDTO): Observable<IUserDTO> {
    const endpoint = `${this.url}/${user.id}`;

    return this.apiService.delete<IUserDTO>(endpoint).pipe(
      tap(() => {
        const notification: INotification = new Notification();
        const messages: Message[] = [
          new Message({ message: notification.user }),
          new Message({
            type: 'dynamic',
            message: `${user.firstName} ${user.lastName}`,
          }),
          new Message({ message: notification.deleted }),
        ];
        return this.notificationService.showSuccess(messages);
      }),
    );
  }

  public resendActivationEmail(user: IUserDTO): Observable<never> {
    const endpoint = `${this.url}/resend-activation-email/${user.id}`;

    return this.apiService.get<never>(endpoint).pipe(
      tap(() => {
        const notification: INotification = new Notification();
        const messages: Message[] = [
          new Message({ message: notification.newActivationEmail }),
          new Message({
            type: 'dynamic',
            message: `${user.firstName} ${user.lastName}`,
          }),
        ];
        return this.notificationService.showSuccess(messages);
      }),
    );
  }
}
