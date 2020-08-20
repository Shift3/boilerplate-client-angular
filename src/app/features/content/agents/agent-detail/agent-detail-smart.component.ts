import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  template: `
    <app-agent-detail-presentation
    ></app-agent-detail-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentDetailSmartComponent { }
