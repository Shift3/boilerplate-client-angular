import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { environment } from '@env/environment';
import {
  ILoginRequest,
  ISessionDTO,
} from '@models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private controllerRoute: string = 'auth';
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public login(payload: ILoginRequest): Observable<ISessionDTO> {
    const endpoint = `${this.url}/login/`;
    return this.apiService.post<ISessionDTO, ILoginRequest>(endpoint, payload).pipe(
      tap((response) => localStorage.setItem('token', response.jwt_token)),
    );
  }

  public logout(): Observable<never>  {
    const endpoint = `${this.url}/logout/`;
    return this.apiService.get<never>(endpoint).pipe(
      tap(() => localStorage.clear()),
    );
  }
}
