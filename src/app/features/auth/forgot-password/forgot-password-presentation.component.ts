import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IFormConfig } from '@models/form/form';
import { FormGroup } from '@angular/forms';
import { IMessage } from '@app/infrastructure/models/message';

@Component({
  selector: 'app-forgot-password-presentation',
  templateUrl: './forgot-password-presentation.component.html',
  styleUrls: ['./forgot-password-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPresentationComponent {
  @Input() public formConfig: IFormConfig;
  @Input() public message: IMessage;

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public formTitle: string = 'Forgot Password';

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}
