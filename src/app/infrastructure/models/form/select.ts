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
  shouldOptionNameBeTranslatedByClient: boolean;
}

export class SelectField<T> implements ISelectField<T> {
  options: ISelectOptions<T>[] = [];
  optionName: string = 'name';
  optionValue: string = 'value';
  shouldOptionNameBeTranslatedByClient: boolean = false;

  constructor(configOverride?: Partial<ISelectField<T>>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
