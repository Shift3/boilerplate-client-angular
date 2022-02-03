import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { IFormConfig, FormConfig } from '@models/form/form';
import { IUserDTO, IChangeEmailRequest, ChangeEmailRequest } from '@models/user';
import { FormService } from '@core/services/form.service';
import { UserService } from '@core/services/api/user.service';
import { buildFormConfig } from './form-config';

@Component({
  selector: 'app-change-email-smart',
  template: `
    <app-change-email-presentation
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="requestEmailChange()"
    ></app-change-email-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeEmailSmartComponent implements OnInit {
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

  public requestEmailChange(): void {
    const requestPayload: IChangeEmailRequest = this.buildPayload();

    this.userService
      .requestEmailChange(requestPayload, this.user.id)
      .subscribe();
  }

  private buildPayload(): IChangeEmailRequest {
    const payloadDTO = new ChangeEmailRequest();
    return this.formService.buildRequestPayload(this.form, payloadDTO);
  }

}
