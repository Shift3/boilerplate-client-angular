import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
} from '@angular/forms';

import {
  FormField,
  IFormField,
} from '@models/form/form';
import { ISelectField } from '@models/form/select';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSelectComponent {
  public config: IFormField<ISelectField<unknown>> = new FormField<ISelectField<unknown>>();
  public group: FormGroup = new FormGroup({});

  public get formControl(): AbstractControl {
    return this.group.get(this.config.name);
  }
}
