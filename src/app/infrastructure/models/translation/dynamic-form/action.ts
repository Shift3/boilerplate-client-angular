export interface IDynamicFormAction {
  add: string;
  addAgency: string;
  addAgent: string;
  addUser: string;
  cancel: string;
  change: string;
  create: string;
  createAccount: string;
  delete: string;
  forgotPassword: string;
  login: string;
  setTranslation: string;
  signUp: string;
  submit: string;
  update: string;
}

export class DynamicFormAction implements IDynamicFormAction {
  add: string = 'dynamicForm.action.add';
  addAgency: string = 'dynamicForm.action.addAgency';
  addAgent: string = 'dynamicForm.action.addAgent';
  addUser: string = 'dynamicForm.action.addUser';
  cancel: string = 'dynamicForm.action.cancel';
  change: string = 'dynamicForm.action.change';
  create: string = 'dynamicForm.action.create';
  createAccount: string = 'dynamicForm.action.createAccount';
  delete: string = 'dynamicForm.action.delete';
  forgotPassword: string = 'dynamicForm.action.forgotPassword';
  login: string = 'dynamicForm.action.login';
  setTranslation: string = 'dynamicForm.action.setTranslation';
  signUp: string = 'dynamicForm.action.signUp';
  submit: string = 'dynamicForm.action.submit';
  update: string = 'dynamicForm.action.update';
}
