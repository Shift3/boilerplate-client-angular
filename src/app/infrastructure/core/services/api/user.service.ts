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
import { IMessage } from '@models/message';
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
          const message = `An activation email has been sent to ${response.email}.`;
          this.notificationService.showSuccess([message]);
        }),
      );
  }

  public forgotPassword(payload: IForgotPasswordRequest): Observable<IMessage> {
    const endpoint = `${this.url}/forgot-password/`;

    return this.apiService
      .post<IMessage, IForgotPasswordRequest>(endpoint, payload)
      .pipe(
        tap((response) =>
          this.notificationService.showSuccess([response.message]),
        ),
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
          const message = 'The password was reset successfully.';
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
          const message = 'This account has been activated. Please log in.';
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
          const message = 'Profile updated.';
          this.notificationService.showSuccess([message]);
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
          const message = `An email has been sent to ${response.email} with instructions to finish activating the account.`;
          return this.notificationService.showSuccess([message]);
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
        tap((response) => localStorage.setItem('token', response.token)),
        tap((response) => this.userStateService.setUserSession(response.user)),
        tap((response) => this.authService.setToken(response.token)),
        tap(() => {
          const message = `Password updated.`;
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
