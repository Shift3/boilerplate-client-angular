import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgentDTO } from '@models/agent';
import {
  IRoleGuard,
  RoleGuard,
} from '@models/role';

@Component({
  selector: 'app-agent-list-presentation',
  templateUrl: './agent-list-presentation.component.html',
  styleUrls: ['./agent-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentListPresentationComponent {
  @Input() public agentList: IAgentDTO;
  @Input() public checkRole: IRoleGuard = new RoleGuard();

  @Output() public emitDelete = new EventEmitter<IAgentDTO>();

  public deleteAgent(agent: IAgentDTO): void {
    this.emitDelete.emit(agent);
  }
}
