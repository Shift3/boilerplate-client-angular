import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { EmailValidation } from '@utils/validation/email-validation';
import { FormConfig, FormField, IFormConfig } from '@models/form/form';
import { FormService } from '@core/services/form.service';
import { IInputField, InputField } from '@models/form/input';
import { IForgotPasswordRequest, ForgotPasswordRequest } from '@models/user';
import { IMessage } from '@models/message';
import { SaveCancelButtonConfig } from '@models/form/button';
import { UserService } from '@core/services/api/user.service';

@Component({
  template: `
    <app-forgot-password-presentation
      [formConfig]="formConfig"
      [message]="message$ | async"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="forgotPassword()"
    ></app-forgot-password-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordSmartComponent {
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    formTitle: {
      action: 'forgot',
      model: 'password',
    },
    submit: new SaveCancelButtonConfig({ save: 'submit' }),
    controls: [
      new FormField<IInputField>({
        name: 'email',
        fieldType: 'input',
        label: 'email',
        placeholder: 'Enter your email',
        fieldConfig: new InputField({
          inputType: 'email',
          autocomplete: 'email',
        }),
        validation: [EmailValidation.validEmail(true)],
      }),
    ],
  });
  public message$ = new Observable<IMessage>();

  constructor(
    private userService: UserService,
    private formService: FormService,
  ) {}

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public forgotPassword(): void {
    const requestPayload = this.buildPayload();
    this.message$ = this.userService.forgotPassword(requestPayload);
  }

  private buildPayload(): IForgotPasswordRequest {
    const payload = new ForgotPasswordRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
