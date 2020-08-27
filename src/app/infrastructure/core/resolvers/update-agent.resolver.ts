import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
} from '@angular/router';

import {
  Observable,
  throwError as observableThrowError,
} from 'rxjs';
import {
  catchError,
  take,
} from 'rxjs/operators';

import { AgentService } from '../services/api/agent.service';
import { IAgentDTO } from '@models/agent';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateAgentResolver implements Resolve<IAgentDTO> {
  constructor(
    private agentService: AgentService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }
    resolve(route: ActivatedRouteSnapshot): Observable<IAgentDTO> {
      const id: number = route.params.id;
      return this.agentService.findAgent(id)
        .pipe(
          take(1),
          catchError((error: HttpErrorResponse) => {
            this.navigateOnError();
            return observableThrowError(error);
          }),
        );
    }

  private navigateOnError(): void {
    const message = 'Unable to load agent. Returning to agent list.';
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/content/agent-list');
  }
}
