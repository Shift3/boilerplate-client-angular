import { IConfirmationModal } from './confirmation-modal';
import { INotFound } from './not-found';
import { INotification } from './notification';
import { ISignUp } from './sign-up';

export interface ITranslation {
  confirmationModal: IConfirmationModal;
  notFound: INotFound;
  notification: INotification;
  signUp: ISignUp;
}
