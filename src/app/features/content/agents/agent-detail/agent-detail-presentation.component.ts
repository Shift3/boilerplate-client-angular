
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgentDTO } from '@models/agent';
import { IFormConfig } from '@models/form/form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agent-detail-presentation',
  templateUrl: './agent-detail-presentation.component.html',
  styleUrls: ['./agent-detail-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentDetailPresentationComponent {
  @Input() public formConfig: IFormConfig;
  @Input() public formTitle: string = 'Create Agent';
  @Input() public agent: IAgentDTO;

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}
