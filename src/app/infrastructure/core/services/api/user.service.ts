import { Injectable } from '@angular/core';

import {
  Observable,
  of as observableOf,
} from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { environment } from '@env/environment';
import {
  ICreateUserRequest,
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
import {
  roleList,
  RoleType,
} from '@models/role';
import { ISelectOptions } from '@models/form/select';

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
      tap((response) => this.notificationService.showSuccess([response.message])),
    );
  }

  public getUserList(): Observable<IUserDTO[]> {
    const endpoint = `${this.url}`;

    return this.apiService.get<IUserDTO[]>(endpoint);
  }

  public createUser(payload: ICreateUserRequest): Observable<IUserDTO>  {
    const endpoint = `${this.url}`;
    payload.roleId = Number(payload.roleId);

    return this.apiService.post<IUserDTO, ICreateUserRequest>(endpoint, payload).pipe(
      tap((response) => {
        const message = `An email has been sent to ${response.email} with instructions to finish activating the account.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }

  /**
   * Local implementation
   */
  public getRoleList(): Observable<ISelectOptions<RoleType>[]> {
    return observableOf(roleList);
  }
}
