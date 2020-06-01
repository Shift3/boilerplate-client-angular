import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
  ) {  }

  public login(payload: unknown): Observable<unknown> {
    const endpoint = `${this.url}/login/`;
    return this.apiService.post<unknown, unknown>(endpoint, payload);
  }

  public logout(): void {
    sessionStorage.clear();
  }
}
