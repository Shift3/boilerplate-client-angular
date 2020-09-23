import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  FormConfig,
  IFormConfig,
} from '@models/form/form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activate-account-presentation',
  templateUrl: './activate-account-presentation.component.html',
  styleUrls: ['./activate-account-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateAccountPresentationComponent {
  @Input() public formConfig: IFormConfig = new FormConfig();

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public formTitle: string = 'Activate Account';

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}
