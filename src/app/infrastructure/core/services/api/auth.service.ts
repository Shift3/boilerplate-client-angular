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
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
  ) {  }

  public login(payload: ILoginRequest): Observable<ISessionDTO> {
    const endpoint = `${this.url}/login/`;
    return this.apiService.post<ISessionDTO, ILoginRequest>(endpoint, payload);
  }

  public logout(payload: any): Observable<never>  {
    const endpoint = `${this.url}/login/`;
    return this.apiService.post<never, any>(endpoint, payload).pipe(
      tap(() => localStorage.clear()),
    );
  }
}
