export interface ISelectOptions<T> {
  name: T;
  value: string | number;
}

export interface ISelectField<T> {
  options: ISelectOptions<T>[];
}

export class SelectField<T> implements ISelectField<T> {
  options: ISelectOptions<T>[] = [];

  constructor(configOverride?: Partial<ISelectField<T>>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
