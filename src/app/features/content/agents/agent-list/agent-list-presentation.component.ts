import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgentDTO } from '@models/agent';
import {
  IDynamicFormAction,
  DynamicFormAction,
} from '@models/translation/dynamic-form/action';
import { IRoleCheck, RoleCheck } from '@models/role';
import { ISelectedLanguage } from '@models/translation/translation';

@Component({
  selector: 'app-agent-list-presentation',
  templateUrl: './agent-list-presentation.component.html',
  styleUrls: ['./agent-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentListPresentationComponent {
  @Input() public agentList: IAgentDTO[] = [];
  @Input() public checkRole: IRoleCheck = new RoleCheck();

  @Output() public emitDelete = new EventEmitter<IAgentDTO>();
  @Output() public emitSelectLanguage = new EventEmitter<ISelectedLanguage>();

  private dynamicFormAction: IDynamicFormAction = new DynamicFormAction();
  public addButtonText: string = this.dynamicFormAction.addAgent;

  public deleteAgent(agent: IAgentDTO): void {
    this.emitDelete.emit(agent);
  }

  public selectLanguage(selectedLanguage: ISelectedLanguage): void {
    this.emitSelectLanguage.emit(selectedLanguage);
  }
}
