import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormField, IFormField } from '@models/form/form';
import { ISelectField, SelectField } from '@models/form/select';

import { TranslationService } from '@app/infrastructure/core/services/translation.service';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  // TODO: This is set to the default change detection for now to show validation messages correctly. Switch back when possible.
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FormSelectComponent {
  public config: IFormField<ISelectField<unknown>> = new FormField<
    ISelectField<unknown>
  >({ fieldConfig: new SelectField<unknown>() });
  public group: FormGroup = new FormGroup({});

  constructor(public translationService: TranslationService) {}

  public get formControl(): AbstractControl {
    return this.group.get(this.config.name);
  }
}
