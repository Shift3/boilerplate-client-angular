export interface IDynamicFormTitle {
  activateAccount: string;
  changePassword: string;
  createAgency: string;
  createAgent: string;
  createUser: string;
  forgotPassword: string;
  memberLogin: string;
  resetPassword: string;
  signUp: string;
  updateAgency: string;
  updateAgent: string;
  updateProfile: string;
  updateUser: string;
}

export class DynamicFormTitle implements IDynamicFormTitle {
  activateAccount: string = 'dynamicForm.title.activateAccount';
  changePassword: string = 'dynamicForm.title.changePassword';
  createAgency: string = 'dynamicForm.title.createAgency';
  createAgent: string = 'dynamicForm.title.createAgent';
  createUser: string = 'dynamicForm.title.createUser';
  forgotPassword: string = 'dynamicForm.title.forgotPassword';
  memberLogin: string = 'dynamicForm.title.memberLogin';
  resetPassword: string = 'dynamicForm.title.resetPassword';
  signUp: string = 'dynamicForm.title.signUp';
  updateAgency: string = 'dynamicForm.title.updateAgency';
  updateAgent: string = 'dynamicForm.title.updateAgent';
  updateProfile: string = 'dynamicForm.title.updateProfile';
  updateUser: string = 'dynamicForm.title.updateUser';
}
