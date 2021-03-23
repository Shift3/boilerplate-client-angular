export interface IDynamicFormInvalidPasswordError {
  missingNumericChar: string;
  missingSpecialChar: string;
  tooShort: string;
}

export class DynamicFormInvalidPasswordError
  implements IDynamicFormInvalidPasswordError {
  missingNumericChar: string =
    'dynamicForm.error.invalidPassword.missingNumericChar';
  missingSpecialChar: string =
    'dynamicForm.error.invalidPassword.missingSpecialChar';
  tooShort: string = 'dynamicForm.error.invalidPassword.tooShort';
}

export interface IDynamicFormError {
  confirmFieldRequired: string;
  fieldsMismatched: string;
  invalidEmail: string;
  invalidPassword: IDynamicFormInvalidPasswordError;
  invalidPhone: string;
  isRequired: string;
}

export class DynamicFormError implements IDynamicFormError {
  confirmFieldRequired: string = 'dynamicForm.error.confirmFieldRequired';
  fieldsMismatched: string = 'dynamicForm.error.fieldsMismatched';
  invalidEmail: string = 'dynamicForm.error.invalidEmail';
  invalidPassword: IDynamicFormInvalidPasswordError = new DynamicFormInvalidPasswordError();
  invalidPhone: string = 'dynamicForm.error.invalidPhone';
  isRequired: string = 'dynamicForm.error.isRequired';
}
