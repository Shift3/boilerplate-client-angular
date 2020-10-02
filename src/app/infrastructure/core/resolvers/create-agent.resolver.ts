import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of as observableOf } from 'rxjs';

import { AgentDTO, IAgentDTO } from '@models/agent';

@Injectable({
  providedIn: 'root',
})
export class CreateAgentResolver implements Resolve<IAgentDTO> {
  resolve(): Observable<IAgentDTO> {
    return observableOf(new AgentDTO());
  }
}
