import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { FormConfig, IFormConfig } from '@models/form/form';
import { FormGroup } from '@angular/forms';
import {
  IDynamicFormAction,
  DynamicFormAction,
} from '@models/translation/dynamic-form/action';
import {
  ISignUpTranslationKey,
  SignUpTranslationKey,
} from '@models/translation/sign-up';

export interface IActions {
  createAccount: string;
  forgotPassword: string;
}

@Component({
  selector: 'app-login-presentation',
  templateUrl: './login-presentation.component.html',
  styleUrls: ['./login-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPresentationComponent {
  @Input() public formConfig: IFormConfig = new FormConfig();

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  private dynamicFormAction: IDynamicFormAction = new DynamicFormAction();
  public actions: IActions = {
    createAccount: this.dynamicFormAction.createAccount,
    forgotPassword: this.dynamicFormAction.forgotPassword,
  };
  public signUpTranslationKeys: ISignUpTranslationKey = new SignUpTranslationKey();

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}
