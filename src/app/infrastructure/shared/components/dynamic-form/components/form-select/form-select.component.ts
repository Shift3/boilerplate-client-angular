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
import { ISelectField, ISelectOptions, SelectField } from '@models/form/select';
import { Utils } from '@utils/utils';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSelectComponent {
  public config: IFormField<ISelectField<unknown>> = new FormField<ISelectField<unknown>>({ fieldConfig: new SelectField<unknown>() });
  public group: FormGroup = new FormGroup({});

  public trackByOptions<T>(index: number, item: ISelectOptions<T>): string | null {
    return Utils.trackByValue(index, item, 'name');
  }

  public get formControl(): AbstractControl {
    return this.group.get(this.config.name);
  }
}
