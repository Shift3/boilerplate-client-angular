export interface IConfirmationModalActionTranslationKey {
  confirm: string;
  continue: string;
  delete: string;
  logOut: string;
  resend: string;
  send: string;
}

export class ConfirmationModalActionTranslationKey
  implements IConfirmationModalActionTranslationKey {
  confirm: string = 'confirmationModal.action.confirm';
  continue: string = 'confirmationModal.action.continue';
  delete: string = 'confirmationModal.action.delete';
  logOut: string = 'confirmationModal.action.logOut';
  resend: string = 'confirmationModal.action.resend';
  send: string = 'confirmationModal.action.send';
}

export interface IConfirmationModalTitleTranslationKey {
  delete: string;
  logout: string;
  resendActivation: string;
  sendResetPassword: string;
}

export class ConfirmationModalTitleTranslationKey
  implements IConfirmationModalTitleTranslationKey {
  delete: string = 'confirmationModal.title.delete';
  logout: string = 'confirmationModal.title.logout';
  resendActivation: string = 'confirmationModal.title.resendActivation';
  sendResetPassword: string = 'confirmationModal.title.sendResetPassword';
}

export interface IConfirmationModalTranslationKey {
  action: IConfirmationModalActionTranslationKey;
  body: string;
  title: IConfirmationModalTitleTranslationKey;
}

export class ConfirmationModalTranslationKey
  implements IConfirmationModalTranslationKey {
  action: IConfirmationModalActionTranslationKey = new ConfirmationModalActionTranslationKey();
  body: string = 'confirmationModal.body';
  title: IConfirmationModalTitleTranslationKey = new ConfirmationModalTitleTranslationKey();
}
