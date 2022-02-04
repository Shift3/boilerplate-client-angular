import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { IConfirmChangeEmailRequest, ConfirmChangeEmailRequest } from '@models/user';
import { IFormConfig, FormConfig } from '@models/form/form';

import { FormService } from '@core/services/form.service';
import { UserService } from '@core/services/api/user.service';
import { buildFormConfig } from './form-config';

@Component({
  selector: 'app-confirm-change-email-smart',
  template: `
    <app-confirm-change-email-presentation
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="confirmChangeEmail()"
    ></app-confirm-change-email-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmChangeEmailSmartComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.formConfig = buildFormConfig();
  }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public confirmChangeEmail(): void {
    const requestPayload = this.buildPayload();
    const snapshot = this.activatedRoute.snapshot;

    this.userService
      .confirmChangeEmail(requestPayload, snapshot.params.token)
      .subscribe(() => this.router.navigateByUrl('/auth/login'));
  }

  private buildPayload(): IConfirmChangeEmailRequest {
    const payload = new ConfirmChangeEmailRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
