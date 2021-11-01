import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { IAgentDTO, IAgentRequest } from '@models/agent';
import { environment } from '@env/environment';
import { NotificationService } from '../notification.service';
import { HttpParams } from '@angular/common/http';

export interface Paginated<T> {
  results: T[];
  meta: {
    pageCount: number;
    count: number;
    page: number;
    pageSize: number;
  };
  links: {
    first: string;
    next: string;
    prev: string;
    last: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private controllerRoute: string = 'agents';
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public getAgentList(
    sort: any,
    query: string,
    endpoint?: string,
  ): Observable<Paginated<IAgentDTO>> {
    let params = new HttpParams();

    if (!endpoint && query) {
      params = params.set('filter', `name__icontains:${query}`);
    }

    if (!endpoint) {
      endpoint = this.url;

      if (sort) {
        const str = Object.entries(sort)
          .map(([k, v]) => (v == -1 ? `-${k}` : k))
          .join(',');

        params = params.set('sort', str);
      }
    }

    return this.apiService.get<Paginated<IAgentDTO>>(endpoint, { params });
  }

  public findAgent(id: number): Observable<IAgentDTO> {
    const endpoint = `${this.url}/${id}`;

    return this.apiService.get<IAgentDTO>(endpoint);
  }

  public createAgent(payload: IAgentRequest): Observable<IAgentDTO> {
    const endpoint = `${this.url}`;

    return this.apiService
      .post<IAgentDTO, IAgentRequest>(endpoint, payload)
      .pipe(
        tap(() => {
          const message = `Agent created.`;
          return this.notificationService.showSuccess([message]);
        }),
      );
  }

  public updateAgent(
    payload: IAgentRequest,
    agentId: number,
  ): Observable<IAgentDTO> {
    const endpoint = `${this.url}/${agentId}`;

    return this.apiService
      .put<IAgentDTO, IAgentRequest>(endpoint, payload)
      .pipe(
        tap(() => {
          const message = `Agent updated.`;
          return this.notificationService.showSuccess([message]);
        }),
      );
  }

  public deleteAgent(agent: IAgentDTO): Observable<IAgentDTO> {
    const endpoint = `${this.url}/${agent.id}`;

    return this.apiService.delete<IAgentDTO>(endpoint).pipe(
      tap(() => {
        const message = `Agent deleted.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }
}
