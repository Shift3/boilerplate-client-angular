import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthService } from '@core/services/api/auth.service';
import { EmailValidation } from '@utils/validation/email-validation';
import {
  FormConfig,
  FormField,
  IFormConfig,
} from '@models/form/form';
import { FormService } from '@core/services/form.service';
import {
  IInputField,
  InputField,
} from '@models/form/input';
import {
  IForgotPasswordRequest,
  ForgotPasswordRequest,
} from '@models/auth';
import { SaveCancelButtonConfig } from '@models/form/button';

@Component({
  template: `
    <app-forgot-password-presentation
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="forgotPassword()"
    ></app-forgot-password-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordSmartComponent {
  public form: FormGroup;
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    submit: new SaveCancelButtonConfig({save: 'Submit'}),
    controls: [
      new FormField<IInputField>({
        name: 'email',
        fieldType: 'input',
        label: 'Email',
        placeholder: 'Enter your email',
        fieldConfig : new InputField({ inputType: 'email' }),
        validation: [ EmailValidation.validEmail(true) ],
      }),
    ],
  });

  constructor(
    private authService: AuthService,
    private formService: FormService,
  ) { }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public forgotPassword(): void {
    const requestPayload = this.buildPayload();
    this.authService.forgotPassword(requestPayload).subscribe();
  }

  private buildPayload(): IForgotPasswordRequest {
    const payload = new ForgotPasswordRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
