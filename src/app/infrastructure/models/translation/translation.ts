import { IConfirmationModal } from './confirmation-modal';
import { DynamicFormTranslationKey } from './dynamic-form/dynamic-form';
import { INotFound } from './not-found';
import { INotification } from './notification';
import { ISignUp } from './sign-up';
import { DynamicTableTranslationKey } from './dynamic-table';

export interface ITranslation {
  confirmationModal: IConfirmationModal;
  dynamicForm: DynamicFormTranslationKey;
  dynamicTable: DynamicTableTranslationKey;
  notFound: INotFound;
  notification: INotification;
  signUp: ISignUp;
}
