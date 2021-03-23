import { IConfirmationModal } from './confirmation-modal';
import { INotFound } from './not-found';
import { INotification } from './notification';
import { ISignUp } from './sign-up';
import { IDynamicTable } from './dynamic-table';

export interface ITranslation {
  confirmationModal: IConfirmationModal;
  dynamicTable: IDynamicTable;
  notFound: INotFound;
  notification: INotification;
  signUp: ISignUp;
}
