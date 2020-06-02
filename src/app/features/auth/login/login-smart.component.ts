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
import { Logger } from '@utils/logger';
import {
  LoginRequest,
  ILoginRequest,
} from '@models/auth';
import { SaveCancelButtonConfig } from '@models/form/button';

@Component({
  template: `
    <app-login-presentation
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="login()"
    ></app-login-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginSmartComponent {
  public form: FormGroup;
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    submit: new SaveCancelButtonConfig({save: 'Log In'}),
    controls: [
      new FormField<IInputField>({
        name: 'email',
        fieldType: 'input',
        label: 'Email',
        placeholder: 'Enter your email',
        fieldConfig : new InputField({ inputType: 'email' }),
      }),
      new FormField<IInputField>({
        name: 'password',
        fieldType: 'input',
        label: 'Password',
        placeholder: 'Enter your password',
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

  public login(): void {
    const requestPayload = this.buildPayload();
    this.authService.login(requestPayload).subscribe((response) => Logger.log(response));
  }

  private buildPayload(): ILoginRequest {
    const payload = new LoginRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
