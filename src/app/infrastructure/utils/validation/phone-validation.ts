import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { Constants } from '@utils/constants';

export class PhoneValidation {
  static validPhone(isRequired?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return isRequired ? { isRequired: 'Phone number is required.' } : null;
      }
      if (!Constants.patterns.US_PHONE_REGEX.test(control.value)) {
        return { invalidPhone: 'Please enter a valid phone number.' };
      }

      return null;
    };
  }
}
