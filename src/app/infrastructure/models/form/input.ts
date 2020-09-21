import { AutocompleteType } from './autocomplete';

export type InputType = 'text' | 'email' | 'password' | 'number';

export interface IInputField {
  inputType: InputType;
  autocomplete: AutocompleteType;
  mask: string;
}

export class InputField implements IInputField {
  inputType: InputType = 'text';
  autocomplete: AutocompleteType = 'on';
  mask: string = '';

  constructor(configOverride?: Partial<IInputField>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
