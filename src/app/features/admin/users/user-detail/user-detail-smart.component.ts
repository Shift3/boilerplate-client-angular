import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import {
  ChangeUserRequest,
  IChangeUserRequest,
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
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  template: `
    <app-user-detail-presentation
      [formTitle]="formTitle"
      [formConfig]="formConfig"
      [user]="user"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="updateOrCreateUser()"
    ></app-user-detail-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailSmartComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public formConfig: IFormConfig = new FormConfig();
  public formTitle: string = '';
  public isSelf: boolean = false;
  public user: IUserDTO;

  private checkSelfSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private router: Router,
    private userService: UserService,
    private userStateService: UserStateService,
  ) {
    this.formTitle = this.activatedRoute.snapshot.data.title;
    this.user = this.activatedRoute.snapshot.data.user;
  }

  public ngOnInit(): void {
    this.checkIfSelfAndBuildFormConfig();
  }

  public ngOnDestroy(): void {
    this.checkSelfSubscription.unsubscribe();
  }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public updateOrCreateUser(): void {
    return (this.user.id) ? this.updateUser() : this.createUser();
  }

  public createUser(): void {
    const requestPayload = this.buildPayload();
    this.userService.createUser(requestPayload).subscribe(() => this.router.navigateByUrl('/admin/user-list'));
  }

  public updateUser(): void {
    const requestPayload = this.buildPayload();
    this.userService.updateUser(requestPayload, this.user.id).subscribe(() => this.router.navigateByUrl('/admin/user-list'));
  }

  private checkIfSelfAndBuildFormConfig(): void {
    this.checkSelfSubscription = this.userStateService.isSelf(this.user.id).subscribe((isSelf) => {
      this.isSelf = isSelf;
      this.formConfig = this.buildFormConfig();
    });
  }

  private buildPayload(): IChangeUserRequest {
    const payload = new ChangeUserRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }

  private buildFormConfig() {
    const formConfig = new FormConfig({
      formName: 'form',
      submit: new SaveCancelButtonConfig({save: (this.user.id) ? 'Update' : 'Create' }),
      controls: [
        new FormField<IInputField>({
          name: 'firstName',
          value: this.user.firstName,
          fieldType: 'input',
          label: 'First Name',
          fieldConfig : new InputField(),
          validation: [ RequiredValidation.required('First Name') ],
        }),
        new FormField<IInputField>({
          name: 'lastName',
          value: this.user.lastName,
          fieldType: 'input',
          label: 'Last Name',
          fieldConfig : new InputField(),
          validation: [ RequiredValidation.required('Last Name') ],
        }),
        new FormField<IInputField>({
          name: 'email',
          value: this.user.email,
          fieldType: 'input',
          label: 'Email',
          fieldConfig : new InputField({ inputType: 'email' }),
          validation: [ EmailValidation.validEmail(true) ],
        }),
        new FormField<ISelectField<RoleType>>({
          name: 'roleId',
          value: this.user.role.id,
          fieldType: 'select',
          label: 'Role',
          fieldConfig : new SelectField({ options: roleList }),
          validation: [ RequiredValidation.required('Role') ],
          disabled: this.isSelf,
        }),
      ],
    });

    return formConfig;
  }
}
