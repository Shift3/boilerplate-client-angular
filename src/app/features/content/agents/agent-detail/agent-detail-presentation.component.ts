import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-agent-detail-presentation',
  templateUrl: './agent-detail-presentation.component.html',
  styleUrls: ['./agent-detail-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentDetailPresentationComponent { }
