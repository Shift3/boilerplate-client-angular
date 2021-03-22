import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '@core/services/api/auth.service';
import { EmailValidation } from '@utils/validation/email-validation';
import { FormConfig, FormField, IFormConfig } from '@models/form/form';
import { FormService } from '@core/services/form.service';
import {
  IDynamicForm,
  DynamicForm,
} from '@models/translation/dynamic-form/dynamic-form';
import { IInputField, InputField } from '@models/form/input';
import { LoginRequest, ILoginRequest } from '@models/auth';
import { RequiredValidation } from '@utils/validation/required-validation';
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
  private dynamicForm: IDynamicForm = new DynamicForm();
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    formTitle: this.dynamicForm.title.memberLogin,
    submit: new SaveCancelButtonConfig({ save: this.dynamicForm.action.login }),
    controls: [
      new FormField<IInputField>({
        name: 'email',
        fieldType: 'input',
        label: this.dynamicForm.label.email,
        placeholder: this.dynamicForm.placeholder.email,
        fieldConfig: new InputField({
          inputType: 'email',
          autocomplete: 'email',
        }),
        validation: [EmailValidation.validEmail(true)],
      }),
      new FormField<IInputField>({
        name: 'password',
        fieldType: 'input',
        label: this.dynamicForm.label.password,
        placeholder: this.dynamicForm.placeholder.password,
        fieldConfig: new InputField({
          inputType: 'password',
          autocomplete: 'current-password',
        }),
        validation: [RequiredValidation.required('Password')],
      }),
    ],
  });
  public token$: Observable<string>;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private router: Router,
  ) {}

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public login(): void {
    const requestPayload = this.buildPayload();
    this.authService
      .login(requestPayload)
      .subscribe((response) => this.router.navigateByUrl('/content'));
  }

  private buildPayload(): ILoginRequest {
    const payload = new LoginRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
