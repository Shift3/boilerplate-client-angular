import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { FormConfig, IFormConfig } from '@models/form/form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password-presentation',
  templateUrl: './change-password-presentation.component.html',
  styleUrls: ['./change-password-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordPresentationComponent {
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
