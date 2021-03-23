import { IConfirmationModal } from './confirmation-modal';
import { IDynamicFormTranslationType } from './dynamic-form/dynamic-form';
import { INotFound } from './not-found';
import { INotification } from './notification';
import { ISignUp } from './sign-up';
import { DynamicTableTranslationKey } from './dynamic-table';

export interface ITranslation {
  confirmationModal: IConfirmationModal;
  dynamicForm: IDynamicFormTranslationType;
  dynamicTable: DynamicTableTranslationKey;
  notFound: INotFound;
  notification: INotification;
  signUp: ISignUp;
}
