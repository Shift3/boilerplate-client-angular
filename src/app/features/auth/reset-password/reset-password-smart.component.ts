import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

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
} from '@models/user';
import { MatchFieldValidation } from '@utils/validation/match-field-validation';
import { PasswordValidation } from '@utils/validation/password-validation';
import { SaveCancelButtonConfig } from '@models/form/button';
import { UserService } from '@core/services/api/user.service';

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
    validation: [ MatchFieldValidation.validFieldMatch('new_password', 'confirm_password', 'Password') ],
    controls: [
      new FormField<IInputField>({
        name: 'new_password',
        fieldType: 'input',
        label: 'New Password',
        placeholder: 'Enter the new password',
        fieldConfig : new InputField({ inputType: 'password' }),
        validation: [ PasswordValidation.validPassword(true) ],
      }),
      new FormField<IInputField>({
        name: 'confirm_password',
        fieldType: 'input',
        label: 'Confirm New Password',
        placeholder: 'Confirm the new password',
        fieldConfig : new InputField({ inputType: 'password' }),
      }),
    ],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private router: Router,
    private userService: UserService,
  ) { }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public resetPassword(): void {
    const requestPayload = this.buildPayload();
    const snapshot = this.activatedRoute.snapshot;
    this.userService.resetPassword(requestPayload, snapshot.params.token).subscribe(() => this.router.navigateByUrl('/auth/login'));
  }

  private buildPayload(): IResetPasswordRequest {
    const payload = new ResetPasswordRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
