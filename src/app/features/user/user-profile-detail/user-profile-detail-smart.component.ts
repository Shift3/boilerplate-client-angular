import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { FormConfig, IFormConfig } from '@models/form/form';
import { IUserDTO, IChangeUserRequest, ChangeUserRequest, IUpdateUserProfile, UpdateUserProfile } from '@models/user';

import { buildFormConfig } from './form-config';
import { UserService } from '@core/services/api/user.service';
import { FormService } from '@app/infrastructure/core/services/form.service';

@Component({
  selector: 'app-user-profile-detail-smart',
  template: `
    <app-user-profile-detail-presentation
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="updateProfile()"
    ></app-user-profile-detail-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileDetailSmartComponent implements OnInit {
  public user: IUserDTO;
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private userService: UserService,
  ) {
    this.user = this.activatedRoute.snapshot.data.user;
  }

  ngOnInit(): void {
    this.formConfig = buildFormConfig({ user: this.user });
  }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public updateProfile(): void {
    const requestPayload: IUpdateUserProfile = this.buildPayload();

    this.userService
      .updateProfile(requestPayload, this.user.id)
      .subscribe();
  }

  private buildPayload(): IUpdateUserProfile {
    const payloadDTO = new UpdateUserProfile();
    return this.formService.buildRequestPayload(this.form, payloadDTO);
  }
}
