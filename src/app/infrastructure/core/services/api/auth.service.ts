import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { ILoginRequest, ISessionDTO } from '@models/auth';
import { UserStateService } from '@core/services/state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private controllerRoute: string = 'auth';
  public token$ = new BehaviorSubject<string>(localStorage.getItem('token'));
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
    private userStateService: UserStateService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public login(payload: ILoginRequest): Observable<ISessionDTO> {
    const endpoint = `${this.url}/login/`;

    return this.apiService
      .post<ISessionDTO, ILoginRequest>(endpoint, payload)
      .pipe(
        tap((response) => localStorage.setItem('token', response.jwtToken)),
        tap((response) => this.userStateService.setUserSession(response.user)),
        tap((response) => this.setToken(response.jwtToken)),
        tap((response) =>
          this.userStateService.setUserSettings(response.user.settings),
        ),
      );
  }

  public logout(): Observable<never | null> {
    const endpoint = `${this.url}/logout/`;

    return this.apiService.get<never>(endpoint).pipe(
      tap(() => this.resetToken()),
      tap(() => this.clearSession()),
      // Reset session client-side even if server-side logout call fails.
      catchError(() => {
        this.clearSession();
        this.resetToken();
        return observableOf(null);
      }),
    );
  }

  public getToken(): Observable<string> {
    return this.token$.asObservable();
  }

  public setToken(token: string): void {
    this.token$.next(token);
  }

  public resetToken(): void {
    this.token$.next('');
  }

  public clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userStateService.resetUserSession();
  }
}
