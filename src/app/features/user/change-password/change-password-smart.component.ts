import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { FormConfig, FormField, IFormConfig } from '@models/form/form';
import { FormService } from '@core/services/form.service';
import { IInputField, InputField } from '@models/form/input';
import {
  ChangePasswordRequest,
  IChangePasswordRequest,
  IUserDTO,
} from '@models/user';
import {
  IDynamicFormTranslationKey,
  DynamicFormTranslationKey,
} from '@models/translation/dynamic-form/dynamic-form';
import { MatchFieldValidation } from '@utils/validation/match-field-validation';
import { PasswordValidation } from '@utils/validation/password-validation';
import { RequiredValidation } from '@utils/validation/required-validation';
import { SaveCancelButtonConfig } from '@models/form/button';
import { UserService } from '@core/services/api/user.service';

@Component({
  template: `
    <app-change-password-presentation
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="changePassword()"
    ></app-change-password-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordSmartComponent {
  private dynamicFormTranslationKeys: IDynamicFormTranslationKey = new DynamicFormTranslationKey();
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    formTitle: this.dynamicFormTranslationKeys.title.changePassword,
    submit: new SaveCancelButtonConfig({
      save: this.dynamicFormTranslationKeys.action.submit,
    }),
    validation: [
      MatchFieldValidation.validFieldMatch(
        'newPassword',
        'confirmPassword',
        'Password',
      ),
    ],
    controls: [
      new FormField<IInputField>({
        name: 'oldPassword',
        fieldType: 'input',
        label: this.dynamicFormTranslationKeys.label.currentPassword,
        placeholder: this.dynamicFormTranslationKeys.placeholder
          .currentPassword,
        fieldConfig: new InputField({
          inputType: 'password',
          autocomplete: 'current-password',
        }),
        validation: [RequiredValidation.required('Current Password')],
      }),
      new FormField<IInputField>({
        name: 'newPassword',
        fieldType: 'input',
        label: this.dynamicFormTranslationKeys.label.newPassword,
        placeholder: this.dynamicFormTranslationKeys.placeholder.newPassword,
        fieldConfig: new InputField({
          inputType: 'password',
          autocomplete: 'new-password',
        }),
        validation: [PasswordValidation.validPassword(true)],
      }),
      new FormField<IInputField>({
        name: 'confirmPassword',
        fieldType: 'input',
        label: this.dynamicFormTranslationKeys.label.confirmNewPassword,
        placeholder: this.dynamicFormTranslationKeys.placeholder
          .confirmPassword,
        fieldConfig: new InputField({
          inputType: 'password',
          autocomplete: 'new-password',
        }),
      }),
    ],
  });
  public user: IUserDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private location: Location,
    private userService: UserService,
  ) {
    this.user = this.activatedRoute.snapshot.data.user;
  }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public changePassword(): void {
    const requestPayload = this.buildPayload();
    this.userService
      .changePassword(requestPayload, this.user.id)
      .subscribe(() => this.location.back());
  }

  private buildPayload(): IChangePasswordRequest {
    const payload = new ChangePasswordRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
