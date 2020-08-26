import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { FormGroup } from '@angular/forms';

import {
  AgentRequest,
  IAgentDTO,
  IAgentRequest,
} from '@models/agent';
import { AgentService } from '@core/services/api/agent.service';
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
import { SaveCancelButtonConfig } from '@models/form/button';

@Component({
  template: `
    <app-agent-detail-presentation
      [agent]="agent"
      [formConfig]="formConfig"
      [formTitle]="formTitle"
      (emitForm)="propagateForm($event)"
    ></app-agent-detail-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentDetailSmartComponent implements OnInit  {
  public agent: IAgentDTO;
  public form: FormGroup;
  public formConfig: IFormConfig = new FormConfig();
  public formTitle: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private agentService: AgentService,
    private formService: FormService,
    private router: Router,
  ) {
    this.agent = this.activatedRoute.snapshot.data.agent;
    this.formTitle = this.activatedRoute.snapshot.data.title;
  }

  public ngOnInit(): void {
    this.formConfig = this.buildFormConfig();
  }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public updateOrCreateAgent(): void {
    return (this.agent.id) ? this.updateAgent() : this.createAgent();
  }

  private buildFormConfig() {
    const formConfig = new FormConfig({
      formName: 'form',
      submit: new SaveCancelButtonConfig({save: (this.agent.id) ? 'Update' : 'Create' }),
      controls: [
        new FormField<IInputField>({
          name: 'name',
          value: this.agent.name,
          fieldType: 'input',
          label: 'Full Name',
          fieldConfig : new InputField(),
          validation: [ RequiredValidation.required('Full Name') ],
        }),
        new FormField<IInputField>({
          name: 'email',
          value: this.agent.email,
          fieldType: 'input',
          label: 'Email',
          fieldConfig : new InputField({ inputType: 'email' }),
          validation: [ EmailValidation.validEmail(true) ],
        }),
        new FormField<IInputField>({
          name: 'description',
          value: this.agent.description,
          fieldType: 'input',
          label: 'Description',
          fieldConfig : new InputField(),
        }),
        new FormField<IInputField>({
          name: 'phoneNumber',
          value: this.agent.phoneNumber,
          fieldType: 'input',
          label: 'Phone Number',
          fieldConfig : new InputField(),
          validation: [ RequiredValidation.required('Phone Number') ],
        }),
        new FormField<IInputField>({
          name: 'address1',
          value: this.agent.address.address1,
          fieldType: 'input',
          label: 'Address',
          fieldConfig : new InputField(),
          validation: [ RequiredValidation.required('Address') ],
        }),
        new FormField<IInputField>({
          name: 'address2',
          value: this.agent.address.address2,
          fieldType: 'input',
          label: 'Address 2',
          fieldConfig : new InputField(),
          validation: [ RequiredValidation.required('Address 2') ],
        }),
        new FormField<IInputField>({
          name: 'city',
          value: this.agent.address.city,
          fieldType: 'input',
          label: 'City',
          fieldConfig : new InputField(),
          validation: [ RequiredValidation.required('City') ],
        }),
        new FormField<IInputField>({
          name: 'state',
          value: this.agent.address.state,
          fieldType: 'input',
          label: 'State',
          fieldConfig : new InputField(),
          validation: [ RequiredValidation.required('State') ],
        }),
        new FormField<IInputField>({
          name: 'zipCode',
          value: this.agent.address.zipCode,
          fieldType: 'input',
          label: 'Zip Code',
          fieldConfig : new InputField(),
          validation: [ RequiredValidation.required('Zip Code') ],
        }),
      ],
    });

    return formConfig;
  }

  private buildPayload(): IAgentRequest {
    const payloadDTO = new AgentRequest();
    return this.formService.buildRequestPayload(this.form, payloadDTO);
  }

  private createAgent(): void {
    const requestPayload = this.buildPayload();
    this.agentService.createAgent(requestPayload).subscribe(() => this.router.navigateByUrl('/content/agent-list'));
  }

  private updateAgent(): void {
    const requestPayload = this.buildPayload();
    this.agentService.updateAgent(requestPayload, this.agent.id).subscribe(() => this.router.navigateByUrl('/content/agent-list'));
  }
}
