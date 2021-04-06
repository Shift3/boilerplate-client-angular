import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { AddressDTO } from '@models/address';
import { AgentRequest, IAgentDTO, IAgentRequest } from '@models/agent';
import { AgentService } from '@core/services/api/agent.service';
import { Constants } from '@utils/constants';
import { EmailValidation } from '@utils/validation/email-validation';
import { FormConfig, FormField, IFormConfig } from '@models/form/form';
import { FormService } from '@core/services/form.service';
import {
  IDynamicFormTranslationKey,
  DynamicFormTranslationKey,
} from '@models/translation/dynamic-form/dynamic-form';
import { IInputField, InputField } from '@models/form/input';
import { ISelectField, SelectField } from '@models/form/select';
import { PhoneValidation } from '@utils/validation/phone-validation';
import { RequiredValidation } from '@utils/validation/required-validation';
import { SaveCancelButtonConfig } from '@models/form/button';
import { stateList } from '@models/state';

@Component({
  template: `
    <app-agent-detail-presentation
      [agent]="agent"
      [formConfig]="formConfig"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="updateOrCreateAgent()"
    ></app-agent-detail-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentDetailSmartComponent implements OnInit {
  public agent: IAgentDTO;
  public form: FormGroup = new FormGroup({});
  public formConfig: IFormConfig = new FormConfig();
  public isSetTranslation: boolean =
    this.activatedRoute.snapshot.routeConfig.path ===
    'set-translation/:id/:languageCode';

  constructor(
    private activatedRoute: ActivatedRoute,
    private agentService: AgentService,
    private formService: FormService,
    private router: Router,
  ) {
    this.agent = this.activatedRoute.snapshot.data.agent;
    this.languageCode =
      this.activatedRoute.snapshot.params.languageCode ||
      translocoConfigObj.defaultLang;
  }

  public ngOnInit(): void {
    this.formConfig = this.buildFormConfig();
  }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public updateOrCreateAgent(): void {
    return this.agent.id ? this.updateAgent() : this.createAgent();
  }

  private buildFormConfig() {
    const dynamicFormTranslationKeys: IDynamicFormTranslationKey = new DynamicFormTranslationKey();
    const formConfig = new FormConfig({
      formName: 'form',
      formTitle: this.agent?.id
        ? dynamicFormTranslationKeys.title.updateAgent
        : dynamicFormTranslationKeys.title.createAgent,
      submit: new SaveCancelButtonConfig({
        save: this.agent?.id
          ? dynamicFormTranslationKeys.action.update
          : dynamicFormTranslationKeys.action.create,
      }),
      controls: [
        new FormField<IInputField>({
          name: 'name',
          value: this.agent?.name,
          fieldType: 'input',
          label: dynamicFormTranslationKeys.label.fullName,
          fieldConfig: new InputField(),
          validation: [RequiredValidation.required('Full Name')],
          disabled: this.isSetTranslation,
        }),
        new FormField<IInputField>({
          name: 'email',
          value: this.agent?.email,
          fieldType: 'input',
          label: dynamicFormTranslationKeys.label.email,
          fieldConfig: new InputField({ inputType: 'email' }),
          validation: [EmailValidation.validEmail(true)],
          disabled: this.isSetTranslation,
        }),
        new FormField<IInputField>({
          name: 'description',
          value: this.agent?.description,
          fieldType: 'input',
          label: dynamicFormTranslationKeys.label.description,
          fieldConfig: new InputField(),
          validation: [RequiredValidation.required('Description')],
        }),
        new FormField<IInputField>({
          name: 'phoneNumber',
          value: this.agent?.phoneNumber,
          fieldType: 'input',
          label: dynamicFormTranslationKeys.label.phoneNumber,
          fieldConfig: new InputField({ mask: Constants.masks.US_PHONE }),
          validation: [PhoneValidation.validPhone(true)],
          disabled: this.isSetTranslation,
        }),
        new FormField<IInputField>({
          name: 'address1',
          value: this.agent?.address.address1,
          fieldType: 'input',
          label: dynamicFormTranslationKeys.label.address,
          fieldConfig: new InputField(),
          validation: [RequiredValidation.required('Address')],
          disabled: this.isSetTranslation,
        }),
        new FormField<IInputField>({
          name: 'address2',
          value: this.agent?.address.address2,
          fieldType: 'input',
          label: dynamicFormTranslationKeys.label.address2,
          fieldConfig: new InputField(),
          disabled: this.isSetTranslation,
        }),
        new FormField<IInputField>({
          name: 'city',
          value: this.agent?.address.city,
          fieldType: 'input',
          label: dynamicFormTranslationKeys.label.city,
          fieldConfig: new InputField(),
          validation: [RequiredValidation.required('City')],
          disabled: this.isSetTranslation,
        }),
        new FormField<ISelectField<string>>({
          name: 'state',
          value: this.agent?.address.state,
          fieldType: 'select',
          label: dynamicFormTranslationKeys.label.state,
          fieldConfig: new SelectField({
            options: stateList,
          }),
          validation: [RequiredValidation.required('State')],
          disabled: this.isSetTranslation,
        }),
        new FormField<IInputField>({
          name: 'zipCode',
          value: this.agent?.address.zipCode,
          fieldType: 'input',
          label: dynamicFormTranslationKeys.label.zipCode,
          fieldConfig: new InputField(),
          validation: [RequiredValidation.required('Zip Code')],
          disabled: this.isSetTranslation,
        }),
      ],
    });

    return formConfig;
  }

  private buildPayload(): IAgentRequest {
    const payloadDTO = new AgentRequest();
    const payload = this.formService.buildRequestPayload(this.form, payloadDTO);
    const addressDTO = new AddressDTO();
    const addressPayload = this.formService.buildRequestPayload(
      this.form,
      addressDTO,
    );
    payload.address = addressPayload;

    return payload;
  }

  private createAgent(): void {
    const requestPayload = this.buildPayload();
    this.agentService
      .createAgent(requestPayload)
      .subscribe(() => this.router.navigateByUrl('/content/agent-list'));
  }

  private updateAgent(): void {
    const requestPayload = this.buildPayload();
    this.agentService
      .updateAgent(requestPayload, this.agent.id)
      .subscribe(() => this.router.navigateByUrl('/content/agent-list'));
  }
}
