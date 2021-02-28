import { ValidatorFn } from '@angular/forms';

import { IInputField } from './input';
import { ISaveCancelButtonConfig, SaveCancelButtonConfig } from './button';
import { ISelectField } from './select';

export type FieldType = 'input' | 'textarea' | 'select';

export interface IFormField<T> {
  name: string;
  label: string;
  placeholder: string;
  fieldType: FieldType;
  fieldConfig: T;
  validation?: ValidatorFn[];
  value: string | number;
  disabled?: boolean;
}

export class FormField<T> implements IFormField<T> {
  name: string;
  label: string;
  placeholder: string = '';
  fieldType: FieldType;
  fieldConfig: T;
  validation?: ValidatorFn[] = [];
  value: string | number = '';
  disabled?: boolean = false;

  constructor(configOverride?: Partial<IFormField<T>>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IFormConfig {
  formName: string;
  formTitle: IFormTitle;
  validation: ValidatorFn[];
  controls: IFormField<IInputField | ISelectField<unknown>>[];
  submit?: ISaveCancelButtonConfig;
}

export interface IFormTitle {
  action?: string;
  model?: string;
}

export class FormTitle implements IFormTitle {
  action?: string;
  model?: string;

  constructor(configOverride?: Partial<IFormTitle>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export class FormConfig implements IFormConfig {
  formName: string = 'form';
  formTitle: IFormTitle = new FormTitle();
  validation: ValidatorFn[] = [];
  controls: IFormField<IInputField | ISelectField<unknown>>[] = [];
  submit?: ISaveCancelButtonConfig = new SaveCancelButtonConfig();

  constructor(configOverride?: Partial<IFormConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
