import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  ISignupRequest,
  SignupRequest,
} from '@models/auth';
import { SaveCancelButtonConfig } from '@models/form/button';

@Component({
  template: `
    <app-sign-up-presentation
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="login()"
    ></app-sign-up-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpSmartComponent {
  public form: FormGroup;
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    submit: new SaveCancelButtonConfig({save: 'Sign Up'}),
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
      new FormField<IInputField>({
        name: 'first_name',
        fieldType: 'input',
        label: 'First Name',
        placeholder: 'Enter your first name',
        fieldConfig : new InputField(),
      }),
      new FormField<IInputField>({
        name: 'last_name',
        fieldType: 'input',
        label: 'Last Name',
        placeholder: 'Enter your last name',
        fieldConfig : new InputField(),
      }),
    ],
  });

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private router: Router,
  ) { }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public login(): void {
    const requestPayload = this.buildPayload();
    this.authService.signUp(requestPayload).subscribe(() => this.router.navigateByUrl('/auth/login'));
  }

  private buildPayload(): ISignupRequest {
    const payload = new SignupRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
