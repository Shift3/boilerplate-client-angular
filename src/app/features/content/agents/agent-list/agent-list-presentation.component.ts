import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgentDTO } from '@models/agent';
import { IRoleCheck, RoleCheck } from '@models/role';

@Component({
  selector: 'app-agent-list-presentation',
  templateUrl: './agent-list-presentation.component.html',
  styleUrls: ['./agent-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentListPresentationComponent {
  @Input() public agentList: IAgentDTO;
  @Input() public checkRole: IRoleCheck = new RoleCheck();
  @Input() public sort: any;

  @Output() public emitDelete = new EventEmitter<IAgentDTO>();
  @Output() public emitSortColumnChange = new EventEmitter<string>();
  @Output() public emitPageChange = new EventEmitter<string>();
  @Output() public emitSearchChange = new EventEmitter<string>();

  public searchChange(query: string) {
    this.emitSearchChange.emit(query);
  }

  public deleteAgent(agent: IAgentDTO): void {
    this.emitDelete.emit(agent);
  }

  public changePage(endpoint: string) {
    this.emitPageChange.emit(endpoint);
  }

  public sortColumnToggle(name: string) {
    this.emitSortColumnChange.emit(name);
  }
}
