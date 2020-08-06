import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import {
  CreateUserRequest,
  ICreateUserRequest,
  IUserDTO,
} from '@models/user';
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
import { RequiredValidation } from '@utils/validation/required-validation';
import {
  roleList,
  RoleType,
} from '@models/role';
import { SaveCancelButtonConfig } from '@models/form/button';
import {
  ISelectField,
  SelectField,
} from '@models/form/select';
import { UserService } from '@core/services/api/user.service';

@Component({
  template: `
    <app-user-detail-presentation
      [user]="user"
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="createUser()"
    ></app-user-detail-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailSmartComponent {
  public form: FormGroup;
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    submit: new SaveCancelButtonConfig({save: 'Create'}),
    controls: [
      new FormField<IInputField>({
        name: 'firstName',
        fieldType: 'input',
        label: 'First Name',
        fieldConfig : new InputField(),
        validation: [ RequiredValidation.required('First Name') ],
      }),
      new FormField<IInputField>({
        name: 'lastName',
        fieldType: 'input',
        label: 'Last Name',
        fieldConfig : new InputField(),
        validation: [ RequiredValidation.required('Last Name') ],
      }),
      new FormField<IInputField>({
        name: 'email',
        fieldType: 'input',
        label: 'Email',
        fieldConfig : new InputField({ inputType: 'email' }),
        validation: [ EmailValidation.validEmail(true) ],
      }),
      new FormField<ISelectField<RoleType>>({
        name: 'roleId',
        fieldType: 'select',
        label: 'Role',
        fieldConfig : new SelectField({ options: roleList }),
        validation: [ RequiredValidation.required('Role') ],
      }),
    ],
  });
  public user: IUserDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private router: Router,
    private userService: UserService,
  ) {
    this.user = this.activatedRoute.snapshot.data.user;
  }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public createUser(): void {
    const requestPayload = this.buildPayload();
    this.userService.createUser(requestPayload).subscribe((response) => this.router.navigateByUrl('/admin/user-list'));
  }

  private buildPayload(): ICreateUserRequest {
    const payload = new CreateUserRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}