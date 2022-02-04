import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { Constants } from '@utils/constants';

export class VerificationCodeValidation {
    static validVerificationCode(isRequired?: boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
              return isRequired ? { isRequired: 'Verification code is required.' } : null;
            }
            if (!Constants.patterns.VERIFICATION_CODE.test(control.value)) {
              return { invalidVerificationCode: 'Please enter a valid verification code.' };
            }

            return null;
      }
    }
}