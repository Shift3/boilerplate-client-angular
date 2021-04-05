import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import {
  AgentTranslation,
  IAgentDTO,
  IAgentRequest,
  IAgentTranslation,
  IAgentTranslationList,
} from '@models/agent';
import { environment } from '@env/environment';
import { Message } from '@models/message';
import { INotification, Notification } from '@models/translation/notification';
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

  public unpackAgentTranslationList(
    content: IAgentTranslationList,
    languageCode: string,
  ): IAgentTranslation {
    const translation = new AgentTranslation();
    for (const property in content) {
      if (content.hasOwnProperty(property) && property === languageCode) {
        for (const translationProperty in translation) {
          if (translation.hasOwnProperty(translationProperty)) {
            translation[translationProperty] =
              content[property][translationProperty];
          }
        }
      }
    }

    return translation;
  }

  public getTranslatedAgent(agent: IAgentDTO, languageCode: string): IAgentDTO {
    agent.translatedContentForDisplay = this.unpackAgentTranslationList(
      agent.dynamicContent,
      languageCode,
    );

    return agent;
  }

  public getTranslatedAgentList(
    agentList: IAgentDTO[],
    languageCode: string,
  ): IAgentDTO[] {
    agentList.forEach((agent) => this.getTranslatedAgent(agent, languageCode));

    return agentList;
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

    return this.apiService
      .post<IAgentDTO, IAgentRequest>(endpoint, payload)
      .pipe(
        tap(() => {
          const notification: INotification = new Notification();
          const message: Message = new Message({
            message: notification.agentCreated,
          });
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
          const notification: INotification = new Notification();
          const message: Message = new Message({
            message: notification.agentUpdated,
          });
          return this.notificationService.showSuccess([message]);
        }),
      );
  }

  public deleteAgent(agent: IAgentDTO): Observable<IAgentDTO> {
    const endpoint = `${this.url}/${agent.id}`;

    return this.apiService.delete<IAgentDTO>(endpoint).pipe(
      tap(() => {
        const notification: INotification = new Notification();
        const message: Message = new Message({
          message: notification.agentDeleted,
        });
        return this.notificationService.showSuccess([message]);
      }),
    );
  }
}
