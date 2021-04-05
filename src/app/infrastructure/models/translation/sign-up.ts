export interface ISignUpTranslationKey {
  cardHeader: string;
  instruction: string;
}

export class SignUpTranslationKey implements ISignUpTranslationKey {
  cardHeader: string = 'signUp.cardHeader';
  instruction: string = 'signUp.instruction';
}
