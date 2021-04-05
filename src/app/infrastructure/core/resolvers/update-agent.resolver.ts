import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { AgentService } from '../services/api/agent.service';
import { IAgentDTO } from '@models/agent';
import { Message } from '@models/message';
import {
  INotificationTranslationKey,
  NotificationTranslationKey,
} from '@models/translation/notification';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateAgentResolver implements Resolve<IAgentDTO> {
  constructor(
    private agentService: AgentService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IAgentDTO> {
    const id: number = route.params.id;
    return this.agentService.findAgent(id).pipe(
      take(1),
      catchError((error: HttpErrorResponse) => {
        this.navigateOnError();
        return observableThrowError(error);
      }),
    );
  }

  private navigateOnError(): void {
    const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();
    const message: Message = new Message({
      message: notificationTranslationKeys.unableToLoadAgent,
    });
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/content/agent-list');
  }
}
