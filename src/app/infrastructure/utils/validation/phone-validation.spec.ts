import { FormControl } from '@angular/forms';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { PhoneValidation } from './phone-validation';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] PhoneValidation', () => {
    describe('validPhone() Required', () => {
      const phoneValidator = PhoneValidation.validPhone(true);
      const phoneControl = new FormControl('');

      it(`should return null if value matches RegEx`, () => {
        phoneControl.setValue('5595551234');
        expect(phoneValidator(phoneControl)).toEqual(null);
      });

      it(`should return { isRequired: 'Phone number is required.' } when value is an empty string`, () => {
        phoneControl.setValue('');
        const expectedValue = { isRequired: 'Phone number is required.' };
        expect(phoneValidator(phoneControl)).toEqual(expectedValue);
      });

      it(`should return { invalidPhone: 'Please enter a valid phone number.' } when value does not match RegEx`, () => {
        phoneControl.setValue('559555123');
        const expectedValue = { invalidPhone: 'Please enter a valid phone number.' };
        expect(phoneValidator(phoneControl)).toEqual(expectedValue);
      });
    });

    describe('validPhone() Not Required', () => {
      const phoneValidator = PhoneValidation.validPhone(false);
      const phoneControl = new FormControl('');

      it(`should return null when value is an empty string`, () => {
        phoneControl.setValue('');
        expect(phoneValidator(phoneControl)).toEqual(null);
      });
    });
  });
