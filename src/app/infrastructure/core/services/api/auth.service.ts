import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
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
  public token$ = new BehaviorSubject<string>(localStorage.getItem('token'));
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
      tap((response) => this.setToken(response.jwt_token)),
    );
  }

  public logout(): Observable<never>  {
    const endpoint = `${this.url}/logout/`;

    return this.apiService.get<never>(endpoint).pipe(
      tap(() => this.resetToken()),
      tap(() => localStorage.clear()),
    );
  }

  public getToken(): Observable<string>  {
    return this.token$.asObservable();
  }

  public setToken(token: string): void {
    this.token$.next(token);
  }

  public resetToken(): void {
    this.token$.next('');
  }
}
