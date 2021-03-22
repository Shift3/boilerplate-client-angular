import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { environment } from '@env/environment.test';
import { FormConfig, FormField } from '@models/form/form';
import { FormService } from './form.service';
import { Logger } from '@utils/logger';
import {
  IDynamicForm,
  DynamicForm,
} from '@models/translation/dynamic-form/dynamic-form';
import { IInputField } from '@models/form/input';
import { LoginRequest } from '@models/auth';
import { MatchFieldValidation } from '@utils/validation/match-field-validation';
import { RequiredValidation } from '@utils/validation/required-validation';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] FormService', () => {
      describe('formService', () => {
        const formService = new FormService(new FormBuilder());
        it('should be created', () => {
          expect(formService).toBeTruthy();
        });
      });

      describe('buildForm()', () => {
        const fb = new FormBuilder();
        const formService = new FormService(fb);
        it(`should return a FormGroup with a FormControl from the provided formConfig`, () => {
          const dynamicForm: IDynamicForm = new DynamicForm();
          const formConfig = new FormConfig({
            controls: [
              new FormField<IInputField>({
                name: 'email',
                label: dynamicForm.label.email,
                placeholder: dynamicForm.placeholder.email,
                fieldType: 'input',
              }),
            ],
          });
          const form = formService.buildForm(formConfig);
          expect(form.contains('email')).toBeTruthy();
        });

        it(`should return a FormGroup with validation errors when given validation on the FormGroup`, () => {
          const dynamicForm: IDynamicForm = new DynamicForm();
          const formConfig = new FormConfig({
            validation: [
              MatchFieldValidation.validFieldMatch(
                'password',
                'confirmPassword',
                'Password',
              ),
            ],
            controls: [
              new FormField<IInputField>({
                name: 'password',
                label: dynamicForm.label.password,
                placeholder: dynamicForm.placeholder.password,
                fieldType: 'input',
              }),
              new FormField<IInputField>({
                name: 'confirmPassword',
                label: dynamicForm.label.confirmPassword,
                placeholder: dynamicForm.placeholder.confirmPassword,
                fieldType: 'input',
              }),
            ],
          });
          const expectedValue = {
            fieldsMismatched: 'Password fields do not match.',
          };
          const form = formService.buildForm(formConfig);
          form.setValue({
            password: 'test',
            confirmPassword: 'tests',
          });
          expect(form.get('confirmPassword').errors).toEqual(expectedValue);
        });
      });

      describe('addFormControl()', () => {
        const fb = new FormBuilder();
        const formService = new FormService(fb);
        it(`should return a FormGroup with a FormControl of the provided name`, () => {
          const form = fb.group({});
          formService.addFormControl(form, 'test');
          expect(form.contains('test')).toBeTruthy();
        });

        it(`should not have a collision if a FormControl is added to a FormGroup that already has a FormControl of that name`, () => {
          const form = fb.group({
            test: '',
          });
          formService.addFormControl(form, 'test');
          expect(form.contains('test')).toBeTruthy();
        });

        it(`should return a FormGroup with a the provided value as the FormControl value`, () => {
          const form = fb.group({});
          const expectedValue = 'testValue';
          formService.addFormControl(form, 'test', 'testValue');
          expect(form.get('test').value).toEqual(expectedValue);
        });

        it(`should return a FormGroup with a disabled control when disabled is true`, () => {
          const form = fb.group({});
          const expectedValue = 'DISABLED';
          formService.addFormControl(form, 'test', '', [], true);
          expect(form.get('test').status).toEqual(expectedValue);
        });

        it(`should return a FormGroup with validation supplying errors on the created FormControl`, () => {
          const form = fb.group({});
          const expectedValue = { isRequired: `Test is required.` };
          formService.addFormControl(form, 'test', '', [
            RequiredValidation.required('Test'),
          ]);
          expect(form.get('test').errors).toEqual(expectedValue);
        });
      });

      describe('buildRequestPayload()', () => {
        const formService = new FormService(new FormBuilder());
        it(`should return a populated request object with values from matching form values`, () => {
          const requestPayload = new LoginRequest();
          const expectedValue = new LoginRequest();
          const form = new FormGroup({});
          form.addControl('email', new FormControl('test@test.com'));
          form.addControl('password', new FormControl('password'));
          expectedValue.email = 'test@test.com';
          expectedValue.password = 'password';
          expect(formService.buildRequestPayload(form, requestPayload)).toEqual(
            expectedValue,
          );
        });

        it(`should return a partially populated object with values from partially matching form values`, () => {
          const payload = new LoginRequest();
          const expectedValue = new LoginRequest();
          const form = new FormGroup({});
          form.addControl('email', new FormControl('test@test.com'));
          form.addControl('test', new FormControl('test'));
          expectedValue.email = 'test@test.com';
          expectedValue.password = '';
          expect(formService.buildRequestPayload(form, payload)).toEqual(
            expectedValue,
          );
        });

        it(`should return an initialized request object when no matching form values are found`, () => {
          const payload = new LoginRequest();
          const expectedValue = new LoginRequest();
          const form = new FormGroup({});
          form.addControl('test', new FormControl('test'));
          expectedValue.email = '';
          expectedValue.password = '';
          expect(formService.buildRequestPayload(form, payload)).toEqual(
            expectedValue,
          );
        });
      });
    });
