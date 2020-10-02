import { FormControl, FormGroup } from '@angular/forms';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { MatchFieldValidation } from './match-field-validation';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] MatchFieldValidation', () => {
      describe('validFieldMatch() default field name', () => {
        const matchFieldValidator = MatchFieldValidation.validFieldMatch(
          'controlName',
          'confirmControlName',
        );
        const form = new FormGroup({
          controlName: new FormControl(''),
          confirmControlName: new FormControl(''),
        });
        const controlName = form.get('controlName');
        const confirmControlName = form.get('confirmControlName');

        it(`should set control error as { confirmFieldRequired: 'Confirm Email is required.' } when value is an empty string`, () => {
          controlName.setValue('');
          confirmControlName.setValue('');
          matchFieldValidator(form);
          const expectedValue = {
            confirmFieldRequired: 'Confirm Email is required.',
          };
          expect(confirmControlName.errors).toEqual(expectedValue);
        });

        it(`should set control error as { fieldsMismatched: 'Email fields do not match.' } when values do not match`, () => {
          controlName.setValue('test@test.com');
          confirmControlName.setValue('test@test.co');
          matchFieldValidator(form);
          const expectedValue = {
            fieldsMismatched: 'Email fields do not match.',
          };
          expect(confirmControlName.errors).toEqual(expectedValue);
        });

        it(`should set control error as null when values match`, () => {
          controlName.setValue('test@test.com');
          confirmControlName.setValue('test@test.com');
          matchFieldValidator(form);
          expect(controlName.errors).toEqual(null);
          expect(confirmControlName.errors).toEqual(null);
        });

        it(`should set control error as null when control matches confirm after not matching`, () => {
          controlName.setValue('test@test.com');
          confirmControlName.setValue('test@test.com');
          matchFieldValidator(form);
          controlName.setValue('test@test.co');
          matchFieldValidator(form);
          controlName.setValue('test@test.com');
          matchFieldValidator(form);
          expect(controlName.errors).toEqual(null);
          expect(confirmControlName.errors).toEqual(null);
        });

        it(`should set control error as null when confirm matches control after not matching`, () => {
          controlName.setValue('test@test.com');
          confirmControlName.setValue('test@test.com');
          matchFieldValidator(form);
          controlName.setValue('test@test.co');
          matchFieldValidator(form);
          confirmControlName.setValue('test@test.co');
          matchFieldValidator(form);
          expect(controlName.errors).toEqual(null);
          expect(confirmControlName.errors).toEqual(null);
        });
      });

      describe(`validFieldMatch('Password') parameter field name`, () => {
        const matchFieldValidator = MatchFieldValidation.validFieldMatch(
          'controlName',
          'confirmControlName',
          'Password',
        );
        const form = new FormGroup({
          controlName: new FormControl(''),
          confirmControlName: new FormControl(''),
        });
        const controlName = form.get('controlName');
        const confirmControlName = form.get('confirmControlName');

        it(`should set control error as { confirmFieldRequired: 'Confirm Password is required.' } when value is an empty string`, () => {
          controlName.setValue('');
          confirmControlName.setValue('');
          matchFieldValidator(form);
          const expectedValue = {
            confirmFieldRequired: 'Confirm Password is required.',
          };
          expect(confirmControlName.errors).toEqual(expectedValue);
        });

        it(`should set control error as { fieldsMismatched: 'Password fields do not match.' } when values do not match`, () => {
          controlName.setValue('test@test.com');
          confirmControlName.setValue('test@test.co');
          matchFieldValidator(form);
          const expectedValue = {
            fieldsMismatched: 'Password fields do not match.',
          };
          expect(confirmControlName.errors).toEqual(expectedValue);
        });
      });
    });
