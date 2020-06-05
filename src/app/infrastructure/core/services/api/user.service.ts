import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { environment } from '@env/environment';
import {
  IForgotPasswordRequest,
  IForgotPasswordDTO,
  IResetPasswordRequest,
} from '@models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private controllerRoute: string = 'users';
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public forgotPassword(payload: IForgotPasswordRequest): Observable<IForgotPasswordDTO> {
    const endpoint = `${this.url}/forgot-password/`;

    return this.apiService.post(endpoint, payload);
  }

  public resetPassword(payload: IResetPasswordRequest): Observable<never> {
    const endpoint = `${this.url}/reset-password/`;

    return this.apiService.put(endpoint, payload);
  }
}
