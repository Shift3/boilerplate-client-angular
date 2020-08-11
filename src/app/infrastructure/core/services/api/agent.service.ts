import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { IAgentDTO } from '@models/agent';
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

  public deleteAgent(provider: IAgentDTO): Observable<IAgentDTO> {
    const endpoint = `${this.url}/${provider.id}`;

    return this.apiService.delete<IAgentDTO>(endpoint).pipe(
      tap(() => {
        const message = `Provider ${provider.name} deleted.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }
}
