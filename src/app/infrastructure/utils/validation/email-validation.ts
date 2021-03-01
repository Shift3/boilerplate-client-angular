import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { Constants } from '@utils/constants';

export class EmailValidation {
  static validEmail(isRequired?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return isRequired ? { isRequired: 'Email is required.' } : null;
      }
      if (!Constants.patterns.EMAIL_REGEX.test(control.value)) {
        return { isInvalid: 'Please enter a valid email.' };
      }

      return null;
    };
  }
}
