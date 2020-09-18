import { AutocompleteType } from './autocomplete';

export interface ISelectOptions<T> {
  name: string;
  value: string | number;
}

export class SelectOptions<T> implements ISelectOptions<T> {
  name: string = '';
  value: string | number = '';

  constructor(configOverride?: Partial<ISelectOptions<T>>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface ISelectField<T> {
  options: ISelectOptions<T>[];
  optionName: string;
  optionValue: string;
  autocomplete: AutocompleteType;
}

export class SelectField<T> implements ISelectField<T> {
  options: ISelectOptions<T>[] = [];
  optionName: string = 'name';
  optionValue: string = 'value';
  autocomplete: AutocompleteType = 'on';

  constructor(configOverride?: Partial<ISelectField<T>>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
