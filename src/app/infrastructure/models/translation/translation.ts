import { INotFound } from './not-found';
import { INotification } from './notification';
import { ISignUp } from './sign-up';

export interface ITranslation {
  notFound: INotFound;
  notification: INotification;
  signUp: ISignUp;
}
