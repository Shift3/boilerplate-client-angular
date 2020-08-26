import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import {
  IAgentDTO,
  IAgentRequest,
} from '@models/agent';
import { environment } from '@env/environment';
import { NotificationService } from '../notification.service';

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

  public getAgentList(): Observable<IAgentDTO[]> {
    const endpoint = `${this.url}`;

    return this.apiService.get<IAgentDTO[]>(endpoint);
  }

  public findAgent(id: number): Observable<IAgentDTO> {
    const endpoint = `${this.url}/${id}`;

    return this.apiService.get<IAgentDTO>(endpoint);
  }

  public createAgent(payload: IAgentRequest): Observable<IAgentDTO> {
    const endpoint = `${this.url}`;

    return this.apiService.post<IAgentDTO, IAgentRequest>(endpoint, payload).pipe(
      tap((response) => {
        const message = `Agent created.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }

  public updateAgent(payload: IAgentRequest, agentId: number): Observable<IAgentDTO> {
    const endpoint = `${this.url}/${agentId}`;

    return this.apiService.put<IAgentDTO, IAgentRequest>(endpoint, payload).pipe(
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
