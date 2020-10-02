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
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    submit: new SaveCancelButtonConfig({ save: 'Submit' }),
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
        label: 'Current Password',
        placeholder: 'Enter the current password',
        fieldConfig: new InputField({
          inputType: 'password',
          autocomplete: 'current-password',
        }),
        validation: [RequiredValidation.required('Current Password')],
      }),
      new FormField<IInputField>({
        name: 'newPassword',
        fieldType: 'input',
        label: 'New Password',
        placeholder: 'Enter a new password',
        fieldConfig: new InputField({
          inputType: 'password',
          autocomplete: 'new-password',
        }),
        validation: [PasswordValidation.validPassword(true)],
      }),
      new FormField<IInputField>({
        name: 'confirmPassword',
        fieldType: 'input',
        label: 'Confirm New Password',
        placeholder: 'Confirm the new password',
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
