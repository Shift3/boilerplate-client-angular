import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of as observableOf } from 'rxjs';

import { AgentDTO, AgentTranslation, IAgentDTO } from '@models/agent';
import { translocoConfigObj } from '@app/transloco/transloco-config';

@Injectable({
  providedIn: 'root',
})
export class CreateAgentResolver implements Resolve<IAgentDTO> {
  resolve(): Observable<IAgentDTO> {
    const defaultLanguageCode = translocoConfigObj.defaultLang;
    return observableOf(
      new AgentDTO({
        dynamicContent: {
          [defaultLanguageCode]: new AgentTranslation(),
        },
      }),
    );
  }
}
