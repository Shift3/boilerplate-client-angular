import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { translocoConfigObj } from '@app/transloco/transloco-config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public get<T>(
    endpoint: string,
    options?: { headers?: HttpHeaders; params?: HttpParams },
  ): Observable<T> {
    return this.httpClient.get<T>(endpoint, options).pipe(shareReplay());
  }

  public post<T, U>(
    endpoint: string,
    payload: U,
    options?: { headers?: HttpHeaders; params?: HttpParams },
  ): Observable<T> {
    return this.httpClient
      .post<T>(endpoint, payload, options)
      .pipe(shareReplay());
  }

  public patch<T, U>(
    endpoint: string,
    payload: U,
    options?: { headers?: HttpHeaders; params?: HttpParams },
  ): Observable<T> {
    return this.httpClient
      .patch<T>(endpoint, payload, options)
      .pipe(shareReplay());
  }

  public put<T, U>(
    endpoint: string,
    payload: U,
    options?: { headers?: HttpHeaders; params?: HttpParams },
  ): Observable<T> {
    return this.httpClient
      .put<T>(endpoint, payload, options)
      .pipe(shareReplay());
  }

  public delete<T>(
    endpoint: string,
    options?: { headers?: HttpHeaders; params?: HttpParams },
  ): Observable<T> {
    return this.httpClient.delete<T>(endpoint, options).pipe(shareReplay());
  }

  public getTranslation<T>(language: string): Observable<T> {
    return this.httpClient
      .get<T>(`${translocoConfigObj.rootTranslationsPath}/${language}.json`)
      .pipe(shareReplay());
  }
}
