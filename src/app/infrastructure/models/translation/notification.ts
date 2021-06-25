export interface INotificationTranslationKey {
  activateAccountSuccess: string;
  activationEmailSent: string;
  agencyCreated: string;
  agencyDeleted: string;
  agencyUpdated: string;
  agentCreated: string;
  agentDeleted: string;
  agentUpdated: string;
  cannotViewPage: string;
  cannotViewPageReturnToDashboard: string;
  cannotViewPageReturnToLogin: string;
  deleted: string;
  emailSent: string;
  forbidden: string;
  instructionToActivate: string;
  newActivationEmail: string;
  noInternet: string;
  noServerConnection: string;
  notFound: string;
  passwordUpdated: string;
  profileUpdated: string;
  resetPasswordSuccess: string;
  returningToDashboard: string;
  returningToUserList: string;
  serverError: string;
  translationCreated: string;
  translationUpdated: string;
  unableToCompleteRequest: string;
  unableToLoadAgencies: string;
  unableToLoadAgency: string;
  unableToLoadAgent: string;
  unableToLoadRequestedLanguage: string;
  unableToLoadRoles: string;
  unableToLoadUser: string;
  unableToLoadUserInfo: string;
  user: string;
  userSettingsUpdated: string;
  userUpdated: string;
}

export class NotificationTranslationKey implements INotificationTranslationKey {
  activateAccountSuccess: string = 'notification.activateAccountSuccess';
  activationEmailSent: string = 'notification.activationEmailSent';
  agencyCreated: string = 'notification.agencyCreated';
  agencyDeleted: string = 'notification.agencyDeleted';
  agencyUpdated: string = 'notification.agencyUpdated';
  agentCreated: string = 'notification.agentCreated';
  agentDeleted: string = 'notification.agentDeleted';
  agentUpdated: string = 'notification.agentUpdated';
  cannotViewPage: string = 'notification.cannotViewPage';
  cannotViewPageReturnToDashboard: string =
    'notification.cannotViewPageReturnToDashboard';
  cannotViewPageReturnToLogin: string =
    'notification.cannotViewPageReturnToLogin';
  deleted: string = 'notification.deleted';
  emailSent: string = 'notification.emailSent';
  forbidden: string = 'notification.forbidden';
  instructionToActivate: string = 'notification.instructionToActivate';
  newActivationEmail: string = 'notification.newActivationEmail';
  noInternet: string = 'notification.noInternet';
  noServerConnection: string = 'notification.noServerConnection';
  notFound: string = 'notification.notFound';
  passwordUpdated: string = 'notification.passwordUpdated';
  profileUpdated: string = 'notification.profileUpdated';
  resetPasswordSuccess: string = 'notification.resetPasswordSuccess';
  returningToDashboard: string = 'notification.returningToDashboard';
  returningToUserList: string = 'notification.returningToUserList';
  serverError: string = 'notification.serverError';
  translationCreated: string = 'notification.translationCreated';
  translationUpdated: string = 'notification.translationUpdated';
  unableToCompleteRequest: string = 'notification.unableToCompleteRequest';
  unableToLoadAgencies: string = 'notification.unableToLoadAgencies';
  unableToLoadAgency: string = 'notification.unableToLoadAgency';
  unableToLoadAgent: string = 'notification.unableToLoadAgent';
  unableToLoadRequestedLanguage: string =
    'notification.unableToLoadRequestedLanguage';
  unableToLoadRoles: string = 'notification.unableToLoadRoles';
  unableToLoadUser: string = 'notification.unableToLoadUser';
  unableToLoadUserInfo: string = 'notification.unableToLoadUserInfo';
  user: string = 'notification.user';
  userSettingsUpdated: string = 'notification.userSettingsUpdated';
  userUpdated: string = 'notification.userUpdated';
}
