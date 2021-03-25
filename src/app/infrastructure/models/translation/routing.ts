export interface IRoutingAdminTranslationKey {
  agencyList: string;
  createAgency: string;
  createUser: string;
  updateAgency: string;
  updateUser: string;
  userList: string;
}

export class RoutingAdminTranslationKey implements IRoutingAdminTranslationKey {
  agencyList: string = 'routing.admin.agencyList';
  createAgency: string = 'routing.admin.createAgency';
  createUser: string = 'routing.admin.createUser';
  updateAgency: string = 'routing.admin.updateAgency';
  updateUser: string = 'routing.admin.updateUser';
  userList: string = 'routing.admin.userList';
}

export interface IRoutingAppTranslationKey {
  notFound: string;
}

export class RoutingAppTranslationKey implements IRoutingAppTranslationKey {
  notFound: string = 'routing.app.notFound';
}

export interface IRoutingAuthTranslationKey {
  activateAccount: string;
  forgotPassword: string;
  login: string;
  logout: string;
  resetPassword: string;
  signUp: string;
}

export class RoutingAuthTranslationKey implements IRoutingAuthTranslationKey {
  activateAccount: string = 'routing.auth.activateAccount';
  forgotPassword: string = 'routing.auth.forgotPassword';
  login: string = 'routing.auth.login';
  logout: string = 'routing.auth.logout';
  resetPassword: string = 'routing.auth.resetPassword';
  signUp: string = 'routing.auth.signUp';
}

export interface IRoutingContentTranslationKey {
  agentList: string;
  createAgent: string;
  updateAgent: string;
}

export class RoutingContentTranslationKey
  implements IRoutingContentTranslationKey {
  agentList: string = 'routing.content.agentList';
  createAgent: string = 'routing.content.createAgent';
  updateAgent: string = 'routing.content.updateAgent';
}

export interface IRoutingUserTranslationKey {
  changePassword: string;
  profile: string;
}

export class RoutingUserTranslationKey implements IRoutingUserTranslationKey {
  changePassword: string = 'routing.user.changePassword';
  profile: string = 'routing.user.profile';
}

export interface IRoutingTranslationKey {
  admin: IRoutingAdminTranslationKey;
  app: IRoutingAppTranslationKey;
  auth: IRoutingAuthTranslationKey;
  content: IRoutingContentTranslationKey;
  user: IRoutingUserTranslationKey;
}

export class RoutingTranslationKey implements IRoutingTranslationKey {
  admin: IRoutingAdminTranslationKey = new RoutingAdminTranslationKey();
  app: IRoutingAppTranslationKey = new RoutingAppTranslationKey();
  auth: IRoutingAuthTranslationKey = new RoutingAuthTranslationKey();
  content: IRoutingContentTranslationKey = new RoutingContentTranslationKey();
  user: IRoutingUserTranslationKey = new RoutingUserTranslationKey();
}
