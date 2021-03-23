export interface IConfirmationModalAction {
  confirm: string;
  continue: string;
  delete: string;
  logOut: string;
  resend: string;
  send: string;
}

export class ConfirmationModalAction implements IConfirmationModalAction {
  confirm: string = 'confirmationModal.action.confirm';
  continue: string = 'confirmationModal.action.continue';
  delete: string = 'confirmationModal.action.delete';
  logOut: string = 'confirmationModal.action.logOut';
  resend: string = 'confirmationModal.action.resend';
  send: string = 'confirmationModal.action.send';
}

export interface IConfirmationModalTitle {
  delete: string;
  logout: string;
  resendActivation: string;
  sendResetPassword: string;
}

export class ConfirmationModalTitle implements IConfirmationModalTitle {
  delete: string = 'confirmationModal.title.delete';
  logout: string = 'confirmationModal.title.logout';
  resendActivation: string = 'confirmationModal.title.resendActivation';
  sendResetPassword: string = 'confirmationModal.title.sendResetPassword';
}

export interface IConfirmationModal {
  action: IConfirmationModalAction;
  body: string;
  title: IConfirmationModalTitle;
}

export class ConfirmationModal implements IConfirmationModal {
  action: IConfirmationModalAction = new ConfirmationModalAction();
  body: string = 'confirmationModal.body';
  title: IConfirmationModalTitle = new ConfirmationModalTitle();
}
