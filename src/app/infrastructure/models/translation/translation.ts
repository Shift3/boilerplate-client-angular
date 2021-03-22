import { IConfirmationModal } from './confirmation-modal';
import { IDynamicForm } from './dynamic-form/dynamic-form';
import { INotFound } from './not-found';
import { INotification } from './notification';
import { ISignUp } from './sign-up';
import { IDynamicTable } from './dynamic-table';

export interface ITranslation {
  confirmationModal: IConfirmationModal;
  dynamicForm: IDynamicForm;
  dynamicTable: IDynamicTable;
  notFound: INotFound;
  notification: INotification;
  signUp: ISignUp;
}
