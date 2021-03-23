import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgentDTO } from '@models/agent';
import {
  IDynamicForm,
  DynamicForm,
} from '@models/translation/dynamic-form/dynamic-form';
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

  @Output() public emitDelete = new EventEmitter<IAgentDTO>();

  private dynamicForm: IDynamicForm = new DynamicForm();
  public addButtonText: string = this.dynamicForm.action.addAgent;

  public deleteAgent(agent: IAgentDTO): void {
    this.emitDelete.emit(agent);
  }
}
