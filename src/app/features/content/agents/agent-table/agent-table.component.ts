import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IAgentDTO } from '@models/agent';
import { IRoleGuard } from '@models/role';

@Component({
  selector: 'app-agent-table',
  templateUrl: './agent-table.component.html',
  styleUrls: ['./agent-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentTableComponent {
  @Input() public checkRole: IRoleGuard;
  @Input() public tableData: IAgentDTO[] = [];

  @Output() public emitDelete = new EventEmitter<IAgentDTO>();

  public deleteAgent(agent: IAgentDTO): void {
    this.emitDelete.emit(agent);
  }
}
