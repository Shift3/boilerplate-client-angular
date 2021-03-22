import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormConfig, FormField, IFormConfig } from '@models/form/form';
import { FormService } from '@core/services/form.service';
import {
  IDynamicForm,
  DynamicForm,
} from '@models/translation/dynamic-form/dynamic-form';
import { IInputField, InputField } from '@models/form/input';
import { IResetPasswordRequest, ResetPasswordRequest } from '@models/user';
import { MatchFieldValidation } from '@utils/validation/match-field-validation';
import { PasswordValidation } from '@utils/validation/password-validation';
import { SaveCancelButtonConfig } from '@models/form/button';
import { UserService } from '@core/services/api/user.service';

@Component({
  template: `
    <app-activate-account-presentation
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="activateAccount()"
    ></app-activate-account-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateAccountSmartComponent {
  private dynamicForm: IDynamicForm = new DynamicForm();
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    formTitle: this.dynamicForm.title.activateAccount,
    submit: new SaveCancelButtonConfig({
      save: this.dynamicForm.action.submit,
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
        name: 'newPassword',
        fieldType: 'input',
        label: this.dynamicForm.label.password,
        placeholder: this.dynamicForm.placeholder.newPassword,
        fieldConfig: new InputField({
          inputType: 'password',
          autocomplete: 'new-password',
        }),
        validation: [PasswordValidation.validPassword(true)],
      }),
      new FormField<IInputField>({
        name: 'confirmPassword',
        fieldType: 'input',
        label: this.dynamicForm.label.confirmPassword,
        placeholder: this.dynamicForm.placeholder.confirmPassword,
        fieldConfig: new InputField({
          inputType: 'password',
          autocomplete: 'new-password',
        }),
      }),
    ],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private router: Router,
    private userService: UserService,
  ) {}

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public activateAccount(): void {
    const requestPayload = this.buildPayload();
    const snapshot = this.activatedRoute.snapshot;
    this.userService
      .activateAccount(requestPayload, snapshot.params.token)
      .subscribe(() => this.router.navigateByUrl('/auth/login'));
  }

  private buildPayload(): IResetPasswordRequest {
    const payload = new ResetPasswordRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
