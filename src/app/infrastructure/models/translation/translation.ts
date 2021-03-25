import { IConfirmationModal } from './confirmation-modal';
import { IDynamicFormTranslationKey } from './dynamic-form/dynamic-form';
import { IDynamicTableTranslationKey } from './dynamic-table';
import { INavigationTranslationKey } from './navigation';
import { INotFound } from './not-found';
import { INotification } from './notification';
import { IRoutingTranslationKey } from './routing';
import { ISignUp } from './sign-up';

export interface ITranslation {
  confirmationModal: IConfirmationModal;
  dynamicForm: IDynamicFormTranslationKey;
  dynamicTable: IDynamicTableTranslationKey;
  navigation: INavigationTranslationKey;
  notFound: INotFound;
  notification: INotification;
  routing: IRoutingTranslationKey;
  signUp: ISignUp;
}
