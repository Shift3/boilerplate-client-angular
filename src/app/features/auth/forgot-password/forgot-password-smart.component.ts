import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { EmailValidation } from '@utils/validation/email-validation';
import { FormConfig, FormField, IFormConfig } from '@models/form/form';
import { FormService } from '@core/services/form.service';
import {
  IDynamicFormTranslationType,
  DynamicFormTranslationType,
} from '@models/translation/dynamic-form/dynamic-form';
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
  private dynamicFormTranslationKeys: IDynamicFormTranslationType = new DynamicFormTranslationType();
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    formTitle: this.dynamicFormTranslationKeys.title.forgotPassword,
    submit: new SaveCancelButtonConfig({
      save: this.dynamicFormTranslationKeys.action.submit,
    }),
    controls: [
      new FormField<IInputField>({
        name: 'email',
        fieldType: 'input',
        label: this.dynamicFormTranslationKeys.label.email,
        placeholder: this.dynamicFormTranslationKeys.placeholder.email,
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
