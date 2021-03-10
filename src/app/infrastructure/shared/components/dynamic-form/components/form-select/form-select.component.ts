import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class FormSelectComponent implements OnInit {
  public config: IFormField<ISelectField<unknown>> = new FormField<
    ISelectField<unknown>
  >({ fieldConfig: new SelectField<unknown>() });
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
      ? this.dataTransformationService.getObjectProperty('label', label)
      : '';
  }

  public get formErrorValue(): string {
    return this.dataTransformationService.getObjectProperty(
      'error',
      Object.keys(this.formControl.errors)[0],
    );
  }
}
