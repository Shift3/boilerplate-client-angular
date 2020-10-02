import { FormControl } from '@angular/forms';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { PasswordValidation } from './password-validation';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] PasswordValidation', () => {
      describe('validPassword() Required', () => {
        const passwordValidator = PasswordValidation.validPassword(true);
        const passwordControl = new FormControl('');

        it(`should return null if value matches RegEx`, () => {
          passwordControl.setValue('passwordTest1!');
          expect(passwordValidator(passwordControl)).toEqual(null);
        });

        it(`should return { invalidPassword: 'Password is required.' } when value is an empty string`, () => {
          passwordControl.setValue('');
          const expectedValue = { invalidPassword: 'Password is required.' };
          expect(passwordValidator(passwordControl)).toEqual(expectedValue);
        });

        it(`should return { invalidPassword: 'Password is too short.' } when value is too short`, () => {
          passwordControl.setValue('test');
          const expectedValue = { invalidPassword: 'Password is too short.' };
          expect(passwordValidator(passwordControl)).toEqual(expectedValue);
        });

        it(`should return { invalidPassword: 'Password requires at least one special character.' } when missing special characters`, () => {
          passwordControl.setValue('passwordTest1');
          const expectedValue = {
            invalidPassword:
              'Password requires at least one special character.',
          };
          expect(passwordValidator(passwordControl)).toEqual(expectedValue);
        });

        it(`should return { invalidPassword: 'Password requires at least one numeric character.' } when missing numeric characters`, () => {
          passwordControl.setValue('passwordTest!');
          const expectedValue = {
            invalidPassword:
              'Password requires at least one numeric character.',
          };
          expect(passwordValidator(passwordControl)).toEqual(expectedValue);
        });
      });

      describe('validPassword() Not Required', () => {
        const passwordValidator = PasswordValidation.validPassword(false);
        const passwordControl = new FormControl('');

        it(`should return null when value is an empty string`, () => {
          passwordControl.setValue('');
          expect(passwordValidator(passwordControl)).toEqual(null);
        });
      });
    });
