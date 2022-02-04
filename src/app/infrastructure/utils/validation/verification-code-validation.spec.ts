import { FormControl } from '@angular/forms';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { VerificationCodeValidation } from './verification-code-validation';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] VerificationCodeValidation', () => {
      describe('validVerificationCode() Required', () => {
        const verificationCodeValidator = VerificationCodeValidation.validVerificationCode(true);
        const verificationCodeControl = new FormControl('');

        it(`should return null if value matches RegEx`, () => {
          verificationCodeControl.setValue('123456');
          expect(verificationCodeValidator(verificationCodeControl)).toEqual(null);
        });

        it(`should return { isRequired: 'Verification code is required.' } when value is an empty string`, () => {
          verificationCodeControl.setValue('');
          const expectedValue = { isRequired: 'Verification code is required.' };
          expect(verificationCodeValidator(verificationCodeControl)).toEqual(expectedValue);
        });

        it(`should return { invalidVerificationCode: 'Please enter a valid verification code.' } when value does not match RegEx`, () => {
          verificationCodeControl.setValue('559555123');
          const expectedValue = {
            invalidVerificationCode: 'Please enter a valid verification code.',
          };
          expect(verificationCodeValidator(verificationCodeControl)).toEqual(expectedValue);
        });
      });

      describe('validVerificationCode() Not Required', () => {
        const verificationCodeValidator = VerificationCodeValidation.validVerificationCode(false);
        const verificationCodeControl = new FormControl('');

        it(`should return null when value is an empty string`, () => {
          verificationCodeControl.setValue('');
          expect(verificationCodeValidator(verificationCodeControl)).toEqual(null);
        });
      });
    });
