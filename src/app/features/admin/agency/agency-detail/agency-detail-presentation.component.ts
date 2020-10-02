import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgencyDTO } from '@models/agency';
import {
  FormConfig,
  IFormConfig,
} from '@models/form/form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agency-detail-presentation',
  templateUrl: './agency-detail-presentation.component.html',
  styleUrls: ['./agency-detail-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyDetailPresentationComponent {
  @Input() public agency: IAgencyDTO;
  @Input() public formConfig: IFormConfig = new FormConfig();

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}
