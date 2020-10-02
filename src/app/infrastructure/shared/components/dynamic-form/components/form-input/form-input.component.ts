import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormField, IFormField } from '@models/form/form';
import { IInputField, InputField } from '@models/form/input';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent {
  public config: IFormField<IInputField> = new FormField<IInputField>({
    fieldConfig: new InputField(),
  });
  public group: FormGroup = new FormGroup({});

  public get formControl(): AbstractControl {
    return this.group.get(this.config.name);
  }
}
