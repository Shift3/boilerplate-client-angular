import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { IAgentDTO } from '@models/agent';
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
    private formService: FormService,
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

  private buildFormConfig() {
    const formConfig = new FormConfig({
      formName: 'form',
      submit: new SaveCancelButtonConfig({save: (this.agent.id) ? 'Update' : 'Create' }),
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
      ],
    });

    return formConfig;
  }
}
