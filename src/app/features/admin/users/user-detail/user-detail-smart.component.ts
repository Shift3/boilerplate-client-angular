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
import {  RoleType } from '@models/role';
import { SaveCancelButtonConfig } from '@models/form/button';
import {
  ISelectField,
  ISelectOptions,
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
  private roleList: ISelectOptions<RoleType>[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private router: Router,
    private userService: UserService,
    private userStateService: UserStateService,
  ) {
    this.formTitle = this.activatedRoute.snapshot.data.title;
    this.user = this.activatedRoute.snapshot.data.user;
    this.roleList = this.activatedRoute.snapshot.data.roleList;
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
    const requestPayload = this.buildPayload();
    if (this.user.id) {
      (this.isSelf) ? this.updateProfile(requestPayload) : this.updateUser(requestPayload);
    } else {
      this.createUser(requestPayload);
    }
  }

  private createUser(requestPayload: IChangeUserRequest): void {
    this.userService.createUser(requestPayload).subscribe(() => this.navigateOnSuccess());
  }

  private updateUser(requestPayload: IChangeUserRequest): void {
    this.userService.updateUser(requestPayload, this.user.id).subscribe(() => this.navigateOnSuccess());
  }

  private updateProfile(requestPayload: IChangeUserRequest): void {
    this.userService.updateProfile(requestPayload, this.user.id).subscribe(() => this.navigateOnSuccess());
  }

  private checkIfSelfAndBuildFormConfig(): void {
    this.checkSelfSubscription = this.userStateService.isSelf(this.user.id).subscribe((isSelf) => {
      this.isSelf = isSelf;
      this.formConfig = this.buildFormConfig();
    });
  }

  private buildPayload(): IChangeUserRequest {
    const payloadDTO = new ChangeUserRequest();
    const payload = this.formService.buildRequestPayload(this.form, payloadDTO);
    if (!this.isSelf) {
      // Set unique value that diverges from the `FormGroup` here
      payload.role.id = this.form.get('roleId').value;
    }
    return payload;
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
      ],
    });

    // Add role control if the user is not the logged in user.
    if (!this.isSelf) {
      const roleList = new FormField<ISelectField<RoleType>>({
        name: 'roleId',
        value: this.user.role.id,
        fieldType: 'select',
        label: 'Role',
        fieldConfig : new SelectField({
          options: this.roleList,
          optionName: 'roleName',
          optionValue: 'id',
        }),
        validation: [ RequiredValidation.required('Role') ],
        disabled: this.isSelf,
      });
      formConfig.controls.push(roleList);
    }

    return formConfig;
  }

  private navigateOnSuccess(): void {
    this.router.navigateByUrl('/admin/user-list');
  }
}
