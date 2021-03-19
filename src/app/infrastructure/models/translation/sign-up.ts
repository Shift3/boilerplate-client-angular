export interface ISignUp {
  cardHeader: string;
  instruction: string;
}

export class SignUp implements ISignUp {
  cardHeader: string = 'signUp.cardHeader';
  instruction: string = 'signUp.instruction';

  constructor(configOverride?: Partial<ISignUp>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
