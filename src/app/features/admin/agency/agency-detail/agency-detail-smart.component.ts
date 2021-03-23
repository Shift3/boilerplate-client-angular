import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { AgencyRequest, IAgencyDTO, IAgencyRequest } from '@models/agency';
import { AgencyService } from '@core/services/api/agency.service';
import { FormConfig, FormField, IFormConfig } from '@models/form/form';
import { FormService } from '@core/services/form.service';
import {
  IDynamicFormTranslationType,
  DynamicFormTranslationType,
} from '@models/translation/dynamic-form/dynamic-form';
import { IInputField, InputField } from '@models/form/input';
import { RequiredValidation } from '@utils/validation/required-validation';
import { SaveCancelButtonConfig } from '@models/form/button';

@Component({
  template: `
    <app-agency-detail-presentation
      [agency]="agency"
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="updateOrCreateAgency()"
    ></app-agency-detail-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyDetailSmartComponent implements OnInit {
  public agency: IAgencyDTO;
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig();

  constructor(
    private activatedRoute: ActivatedRoute,
    private agencyService: AgencyService,
    private formService: FormService,
    private location: Location,
  ) {
    this.agency = this.activatedRoute.snapshot.data.agency;
  }

  public ngOnInit(): void {
    this.formConfig = this.buildFormConfig();
  }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public updateOrCreateAgency(): void {
    const requestPayload = this.buildPayload();
    return this.agency.id
      ? this.updateAgency(requestPayload)
      : this.createAgency(requestPayload);
  }

  private buildFormConfig() {
    const dynamicFormTranslationKeys: IDynamicFormTranslationType = new DynamicFormTranslationType();
    const formConfig = new FormConfig({
      formName: 'form',
      formTitle: this.agency?.id
        ? dynamicFormTranslationKeys.title.updateAgency
        : dynamicFormTranslationKeys.title.createAgency,
      submit: new SaveCancelButtonConfig({
        save: this.agency?.id
          ? dynamicFormTranslationKeys.action.update
          : dynamicFormTranslationKeys.action.create,
      }),
      controls: [
        new FormField<IInputField>({
          name: 'agencyName',
          value: this.agency?.agencyName,
          fieldType: 'input',
          label: dynamicFormTranslationKeys.label.agencyName,
          fieldConfig: new InputField(),
          validation: [RequiredValidation.required('Agency Name')],
        }),
      ],
    });

    return formConfig;
  }

  private buildPayload(): IAgencyRequest {
    const payloadDTO = new AgencyRequest();
    return this.formService.buildRequestPayload(this.form, payloadDTO);
  }

  private createAgency(requestPayload: IAgencyRequest): void {
    this.agencyService
      .createAgency(requestPayload)
      .subscribe(() => this.navigateOnSuccess());
  }

  private updateAgency(requestPayload: IAgencyRequest): void {
    this.agencyService
      .updateAgency(requestPayload, this.agency.id)
      .subscribe(() => this.navigateOnSuccess());
  }

  private navigateOnSuccess(): void {
    this.location.back();
  }
}
