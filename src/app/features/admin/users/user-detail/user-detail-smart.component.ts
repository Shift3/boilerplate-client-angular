import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { IAgencyDTO } from '@models/agency';
import { ChangeUserRequest, IChangeUserRequest, IUserDTO } from '@models/user';
import { EmailValidation } from '@utils/validation/email-validation';
import { FormConfig, FormField, IFormConfig } from '@models/form/form';
import { FormService } from '@core/services/form.service';
import { IInputField, InputField } from '@models/form/input';
import { RequiredValidation } from '@utils/validation/required-validation';
import { IRoleCheck, RoleType } from '@models/role';
import { SaveCancelButtonConfig } from '@models/form/button';
import { ISelectField, ISelectOptions, SelectField } from '@models/form/select';
import { UserService } from '@core/services/api/user.service';
import { UserStateService } from '@core/services/state/user-state.service';
import {
  IDynamicForm,
  DynamicForm,
} from '@models/translation/dynamic-form/dynamic-form';

@Component({
  template: `
    <app-user-detail-presentation
      [formConfig]="formConfig"
      [user]="user"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="updateOrCreateUser()"
    ></app-user-detail-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailSmartComponent implements OnInit, OnDestroy {
  public checkRole: IRoleCheck;
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig();
  public isSelf: boolean = false;
  public user: IUserDTO;

  private agencyList: ISelectOptions<IAgencyDTO>[];
  private roleList: ISelectOptions<RoleType>[];
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private location: Location,
    private userService: UserService,
    private userStateService: UserStateService,
  ) {
    this.user = this.activatedRoute.snapshot.data.user;
    this.agencyList = this.activatedRoute.snapshot.data.agencyList;
    this.roleList = this.activatedRoute.snapshot.data.roleList;
  }

  public ngOnInit(): void {
    this.checkRoleList();
    this.checkIfSelfAndBuildFormConfig();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  private checkRoleList(): void {
    const roleCheckSubscription = this.userStateService
      .checkRoleList()
      .subscribe((role) => {
        this.checkRole = role;
      });
    this.subscriptions.push(roleCheckSubscription);
  }

  public updateOrCreateUser(): void {
    const requestPayload = this.buildPayload();
    if (this.user.id) {
      this.isSelf
        ? this.updateProfile(requestPayload)
        : this.updateUser(requestPayload);
    } else {
      this.createUser(requestPayload);
    }
  }

  private createUser(requestPayload: IChangeUserRequest): void {
    this.userService
      .createUser(requestPayload)
      .subscribe(() => this.navigateOnSuccess());
  }

  private updateUser(requestPayload: IChangeUserRequest): void {
    this.userService
      .updateUser(requestPayload, this.user.id)
      .subscribe(() => this.navigateOnSuccess());
  }

  private updateProfile(requestPayload: IChangeUserRequest): void {
    this.userService
      .updateProfile(requestPayload, this.user.id)
      .subscribe(() => this.navigateOnSuccess());
  }

  private checkIfSelfAndBuildFormConfig(): void {
    const checkSelfSubscription = this.userStateService
      .isSelf(this.user?.id)
      .subscribe((isSelf) => {
        this.isSelf = isSelf;
        this.formConfig = this.buildFormConfig();
      });
    this.subscriptions.push(checkSelfSubscription);
  }

  private buildPayload(): IChangeUserRequest {
    const payloadDTO = new ChangeUserRequest();
    const payload = this.formService.buildRequestPayload(this.form, payloadDTO);
    // Set unique values that diverges from the `FormGroup` here
    if (this.checkRole.isSuperAdmin && !this.isSelf) {
      payload.agency.agencyName = this.form.get('agencyName').value;
    }
    if (!this.isSelf) {
      payload.role.id = this.form.get('roleId').value;
    }
    return payload;
  }

  private buildFormConfig() {
    const dynamicForm: IDynamicForm = new DynamicForm();
    const formConfig = new FormConfig({
      formName: 'form',
      formTitle:
        this.activatedRoute.snapshot.routeConfig?.path === 'profile'
          ? dynamicForm.title.updateProfile
          : this.user?.id
          ? dynamicForm.title.updateUser
          : dynamicForm.title.createUser,
      submit: new SaveCancelButtonConfig({
        save: this.user?.id
          ? dynamicForm.action.update
          : dynamicForm.action.create,
      }),
      controls: [
        new FormField<IInputField>({
          name: 'firstName',
          value: this.user?.firstName,
          fieldType: 'input',
          label: dynamicForm.label.firstName,
          fieldConfig: new InputField({ autocomplete: 'given-name' }),
          validation: [RequiredValidation.required('First Name')],
        }),
        new FormField<IInputField>({
          name: 'lastName',
          value: this.user?.lastName,
          fieldType: 'input',
          label: dynamicForm.label.lastName,
          fieldConfig: new InputField({ autocomplete: 'family-name' }),
          validation: [RequiredValidation.required('Last Name')],
        }),
        new FormField<IInputField>({
          name: 'email',
          value: this.user?.email,
          fieldType: 'input',
          label: dynamicForm.label.email,
          fieldConfig: new InputField({
            inputType: 'email',
            autocomplete: 'email',
          }),
          validation: [EmailValidation.validEmail(true)],
        }),
      ],
    });

    // Add agency control only if the user is a Super Administrator.
    if (this.checkRole.isSuperAdmin && !this.isSelf) {
      const agencyList = new FormField<ISelectField<IAgencyDTO>>({
        name: 'agencyName',
        value: this.user?.agency.agencyName,
        fieldType: 'select',
        label: dynamicForm.label.agency,
        fieldConfig: new SelectField({
          options: this.agencyList,
          optionName: 'agencyName',
          optionValue: 'agencyName',
        }),
        validation: [RequiredValidation.required('Agency')],
        disabled: !this.checkRole.isSuperAdmin,
      });
      formConfig.controls.push(agencyList);
    }

    // Add role control if the user is not the logged in user.
    if (!this.isSelf) {
      const roleList = new FormField<ISelectField<RoleType>>({
        name: 'roleId',
        value: this.user?.role.id,
        fieldType: 'select',
        label: dynamicForm.label.role,
        fieldConfig: new SelectField({
          options: this.roleList,
          optionName: 'roleName',
          optionValue: 'id',
        }),
        validation: [RequiredValidation.required('Role')],
        disabled: this.isSelf,
      });
      formConfig.controls.push(roleList);
    }

    return formConfig;
  }

  private navigateOnSuccess(): void {
    this.location.back();
  }
}
