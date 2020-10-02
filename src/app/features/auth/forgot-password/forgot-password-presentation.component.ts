import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { FormConfig, IFormConfig } from '@models/form/form';
import { FormGroup } from '@angular/forms';
import { IMessage } from '@models/message';

@Component({
  selector: 'app-forgot-password-presentation',
  templateUrl: './forgot-password-presentation.component.html',
  styleUrls: ['./forgot-password-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPresentationComponent {
  @Input() public formConfig: IFormConfig = new FormConfig();
  @Input() public message: IMessage;

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}
