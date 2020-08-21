import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
import { PasswordValidation } from '@utils/validation/password-validation';
import { RequiredValidation } from '@utils/validation/required-validation';
import { SaveCancelButtonConfig } from '@models/form/button';
import {
  ISignupRequest,
  SignupRequest,
} from '@models/auth';
import { UserService } from '@app/infrastructure/core/services/api/user.service';

@Component({
  template: `
    <app-sign-up-presentation
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="signup()"
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
        validation: [ EmailValidation.validEmail(true) ],
      }),
      new FormField<IInputField>({
        name: 'password',
        fieldType: 'input',
        label: 'Password',
        placeholder: 'Enter your password',
        fieldConfig : new InputField({ inputType: 'password' }),
        validation: [ PasswordValidation.validPassword(true) ],
      }),
      new FormField<IInputField>({
        name: 'firstName',
        fieldType: 'input',
        label: 'First Name',
        placeholder: 'Enter your first name',
        fieldConfig : new InputField(),
        validation: [ RequiredValidation.required('First Name') ],
      }),
      new FormField<IInputField>({
        name: 'lastName',
        fieldType: 'input',
        label: 'Last Name',
        placeholder: 'Enter your last name',
        fieldConfig : new InputField(),
        validation: [ RequiredValidation.required('Last Name') ],
      }),
    ],
  });

  constructor(
    private formService: FormService,
    private router: Router,
    private userService: UserService,
  ) { }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public signup(): void {
    const requestPayload = this.buildPayload();
    this.userService.signUp(requestPayload).subscribe(() => this.router.navigateByUrl('/auth/login'));
  }

  private buildPayload(): ISignupRequest {
    const payload = new SignupRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
