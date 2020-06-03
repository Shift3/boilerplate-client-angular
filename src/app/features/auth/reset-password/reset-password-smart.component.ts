import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthService } from '@core/services/api/auth.service';
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
  IResetPasswordRequest,
  ResetPasswordRequest,
} from '@models/auth';
import { SaveCancelButtonConfig } from '@models/form/button';

@Component({
  template: `
    <app-reset-password-presentation
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="resetPassword()"
    ></app-reset-password-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordSmartComponent {
  public form: FormGroup;
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    submit: new SaveCancelButtonConfig({save: 'Submit'}),
    controls: [
      new FormField<IInputField>({
        name: 'currentPassword',
        fieldType: 'input',
        label: 'Current Password',
        placeholder: 'Enter your current password',
        fieldConfig : new InputField({ inputType: 'password' }),
      }),
      new FormField<IInputField>({
        name: 'newPassword',
        fieldType: 'input',
        label: 'New Password',
        placeholder: 'Enter the new password',
        fieldConfig : new InputField({ inputType: 'password' }),
      }),
      new FormField<IInputField>({
        name: 'confirmNewPassword',
        fieldType: 'input',
        label: 'Confirm New Password',
        placeholder: 'Confirm the new password',
        fieldConfig : new InputField({ inputType: 'password' }),
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

  public resetPassword(): void {
    const requestPayload = this.buildPayload();
    this.authService.resetPassword(requestPayload).subscribe();
  }

  private buildPayload(): IResetPasswordRequest {
    const payload = new ResetPasswordRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
