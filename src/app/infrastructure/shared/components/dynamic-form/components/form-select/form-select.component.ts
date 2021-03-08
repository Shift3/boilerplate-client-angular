import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormField, IFormField } from '@models/form/form';
import { ISelectField, SelectField } from '@models/form/select';

import { DataTransformationService } from '@core/services/data-transformation.service';

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

  constructor(private dataTransformationService: DataTransformationService) {}

  public get formControl(): AbstractControl {
    return this.group.get(this.config.name);
  }

  public getObjectProperty(label: string): string {
    return label.length
      ? this.dataTransformationService.getObjectProperty(
          'dynamicForm.label',
          label,
        )
      : '';
  }
}
