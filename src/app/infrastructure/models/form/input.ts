export type InputType = 'text' | 'email' | 'password' | 'number';

export interface IInputField {
  inputType: InputType;
}

export class InputField implements IInputField {
  inputType: InputType = 'text';

  constructor(configOverride?: Partial<IInputField>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
