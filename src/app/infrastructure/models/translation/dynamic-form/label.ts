export interface IDynamicFormLabel {
  address: string;
  address2: string;
  agency: string;
  agencyName: string;
  city: string;
  confirm: string;
  confirmEmail: string;
  confirmNewPassword: string;
  confirmPassword: string;
  currentPassword: string;
  description: string;
  email: string;
  firstName: string;
  fullName: string;
  lastName: string;
  newPassword: string;
  password: string;
  phoneNumber: string;
  role: string;
  state: string;
  zipCode: string;
}

export class DynamicFormLabel implements IDynamicFormLabel {
  address: string = 'dynamicForm.label.address';
  address2: string = 'dynamicForm.label.address2';
  agency: string = 'dynamicForm.label.agency';
  agencyName: string = 'dynamicForm.label.agencyName';
  city: string = 'dynamicForm.label.city';
  confirm: string = 'dynamicForm.label.confirm';
  confirmEmail: string = 'dynamicForm.label.confirmEmail';
  confirmNewPassword: string = 'dynamicForm.label.confirmNewPassword';
  confirmPassword: string = 'dynamicForm.label.confirmPassword';
  currentPassword: string = 'dynamicForm.label.currentPassword';
  description: string = 'dynamicForm.label.description';
  email: string = 'dynamicForm.label.email';
  firstName: string = 'dynamicForm.label.firstName';
  fullName: string = 'dynamicForm.label.fullName';
  lastName: string = 'dynamicForm.label.lastName';
  newPassword: string = 'dynamicForm.label.newPassword';
  password: string = 'dynamicForm.label.password';
  phoneNumber: string = 'dynamicForm.label.phoneNumber';
  role: string = 'dynamicForm.label.role';
  state: string = 'dynamicForm.label.state';
  zipCode: string = 'dynamicForm.label.zipCode';
}
