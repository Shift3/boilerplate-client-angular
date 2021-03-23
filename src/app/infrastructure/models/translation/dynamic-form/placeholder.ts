export interface IDynamicFormPlaceholder {
  confirmEmail: string;
  confirmPassword: string;
  currentPassword: string;
  default: string;
  email: string;
  enter: string;
  firstName: string;
  lastName: string;
  newPassword: string;
  password: string;
}

export class DynamicFormPlaceholder implements IDynamicFormPlaceholder {
  confirmEmail: string = 'dynamicForm.placeholder.confirmEmail';
  confirmPassword: string = 'dynamicForm.placeholder.confirmPassword';
  currentPassword: string = 'dynamicForm.placeholder.currentPassword';
  default: string = 'dynamicForm.placeholder.default';
  email: string = 'dynamicForm.placeholder.email';
  enter: string = 'dynamicForm.placeholder.enter';
  firstName: string = 'dynamicForm.placeholder.firstName';
  lastName: string = 'dynamicForm.placeholder.lastName';
  newPassword: string = 'dynamicForm.placeholder.newPassword';
  password: string = 'dynamicForm.placeholder.password';
}
