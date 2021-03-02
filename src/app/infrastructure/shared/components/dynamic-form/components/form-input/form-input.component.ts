import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormField, IFormField } from '@models/form/form';
import { IInputField, InputField } from '@models/form/input';

import { DataTransformationService } from '@core/services/data-transformation.service';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  // TODO: This is set to the default change detection for now to show validation messages correctly. Switch back when possible.
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FormInputComponent {
  public config: IFormField<IInputField> = new FormField<IInputField>({
    fieldConfig: new InputField(),
  });
  public configLabel: string;
  public group: FormGroup = new FormGroup({});

  constructor(private dataTransformationService: DataTransformationService) {}

  ngOnInit() {
    this.configLabel = this.dataTransformationService.getObjectProperty(
      'label',
      this.config.label,
    );
  }

  public get formControl(): AbstractControl {
    return this.group.get(this.config.name);
  }

  public getObjectProperty(label: string): string {
    return label?.length
      ? this.dataTransformationService.getObjectProperty(
          'dynamicForm.label',
          label,
        )
      : '';
  }

  public get formErrors(): string {
    return this.dataTransformationService.getObjectProperty(
      'dynamicForm.error',
      Object.keys(this.formControl.errors)[0],
    );
  }
}
