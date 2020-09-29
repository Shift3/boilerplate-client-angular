import { AutocompleteType } from './autocomplete';

export type InputType = 'text' | 'email' | 'password' | 'number';

export interface IInputField {
  inputType: InputType;
  autocomplete: AutocompleteType;
  mask: string | RegExp;
}

export class InputField implements IInputField {
  inputType: InputType = 'text';
  autocomplete: AutocompleteType = 'on';
  mask: string | RegExp = '';

  constructor(configOverride?: Partial<IInputField>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
