import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { EmailValidation } from '@utils/validation/email-validation';
import { FormConfig, FormField, IFormConfig } from '@models/form/form';
import { FormService } from '@core/services/form.service';
import {
  IDynamicFormTranslationType,
  DynamicFormTranslationType,
} from '@models/translation/dynamic-form/dynamic-form';
import { IInputField, InputField } from '@models/form/input';
import { ISignupRequest, SignupRequest } from '@models/auth';
import { MatchFieldValidation } from '@utils/validation/match-field-validation';
import { RequiredValidation } from '@utils/validation/required-validation';
import { SaveCancelButtonConfig } from '@models/form/button';
import { UserService } from '@core/services/api/user.service';

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
  private dynamicFormTranslationKeys: IDynamicFormTranslationType = new DynamicFormTranslationType();
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    formTitle: this.dynamicFormTranslationKeys.title.signUp,
    submit: new SaveCancelButtonConfig({
      save: this.dynamicFormTranslationKeys.action.signUp,
    }),
    validation: [
      MatchFieldValidation.validFieldMatch('email', 'confirmEmail', 'Email'),
    ],
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
      new FormField<IInputField>({
        name: 'confirmEmail',
        fieldType: 'input',
        label: this.dynamicFormTranslationKeys.label.confirmEmail,
        placeholder: this.dynamicFormTranslationKeys.placeholder.confirmEmail,
        fieldConfig: new InputField({
          inputType: 'email',
          autocomplete: 'email',
        }),
      }),
      new FormField<IInputField>({
        name: 'firstName',
        fieldType: 'input',
        label: this.dynamicFormTranslationKeys.label.firstName,
        placeholder: this.dynamicFormTranslationKeys.placeholder.firstName,
        fieldConfig: new InputField({ autocomplete: 'given-name' }),
        validation: [RequiredValidation.required('First Name')],
      }),
      new FormField<IInputField>({
        name: 'lastName',
        fieldType: 'input',
        label: this.dynamicFormTranslationKeys.label.lastName,
        placeholder: this.dynamicFormTranslationKeys.placeholder.lastName,
        fieldConfig: new InputField({ autocomplete: 'family-name' }),
        validation: [RequiredValidation.required('Last Name')],
      }),
    ],
  });

  constructor(
    private formService: FormService,
    private router: Router,
    private userService: UserService,
  ) {}

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public signup(): void {
    const requestPayload = this.buildPayload();
    this.userService
      .signUp(requestPayload)
      .subscribe(() => this.router.navigateByUrl('/auth/login'));
  }

  private buildPayload(): ISignupRequest {
    const payload = new SignupRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
