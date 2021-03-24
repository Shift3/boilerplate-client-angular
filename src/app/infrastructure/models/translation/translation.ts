import { IConfirmationModal } from './confirmation-modal';
import { DynamicFormTranslationKey } from './dynamic-form/dynamic-form';
import { DynamicTableTranslationKey } from './dynamic-table';
import { INotFound } from './not-found';
import { INotification } from './notification';
import { IRoutingTranslationKey } from './routing';
import { ISignUp } from './sign-up';

export interface ITranslation {
  confirmationModal: IConfirmationModal;
  dynamicForm: DynamicFormTranslationKey;
  dynamicTable: DynamicTableTranslationKey;
  notFound: INotFound;
  notification: INotification;
  routing: IRoutingTranslationKey;
  signUp: ISignUp;
}
