import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IForgotPasswordDTO } from '@app/infrastructure/models/user';
import { IFormConfig } from '@models/form/form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-presentation',
  templateUrl: './forgot-password-presentation.component.html',
  styleUrls: ['./forgot-password-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPresentationComponent {
  @Input() public formConfig: IFormConfig;
  @Input() public message: IForgotPasswordDTO;

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
