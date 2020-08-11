import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { IAgentDTO } from '@models/agent';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private controllerRoute: string = 'agents';
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public getAgentList(): Observable<IAgentDTO[]> {
    const endpoint = `${this.url}`;

    return this.apiService.get<IAgentDTO[]>(endpoint);
  }
}
