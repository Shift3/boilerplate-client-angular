export interface ISelectOptions {
  name: string;
  value: string;
}

export interface ISelectField {
  options: ISelectOptions[];
}

export class SelectField implements ISelectField {
  options: ISelectOptions[] = [];

  constructor(configOverride?: Partial<ISelectField>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
