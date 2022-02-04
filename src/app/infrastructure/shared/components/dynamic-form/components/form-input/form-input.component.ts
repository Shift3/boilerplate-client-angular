import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormField, IFormField } from '@models/form/form';
import { IInputField, InputField } from '@models/form/input';

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
  public group: FormGroup = new FormGroup({});

  public get formControl(): AbstractControl {
    return this.group.get(this.config.name);
  }

  public validateValue(value: string): void {
    if (value && this.config.fieldConfig.inputType === 'number') {
      this.group.controls[this.config.name].setValue(parseFloat(value));
    }

    if (value?.length > 0 && !value?.trim()) {
      this.group.controls[this.config.name].setValue(value.trim());
    }
  }
}
