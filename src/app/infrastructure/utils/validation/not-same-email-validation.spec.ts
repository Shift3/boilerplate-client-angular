import { FormControl } from '@angular/forms';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { NotSameEmailValidation } from './not-same-email-validation';

!environment.testUnit
    ? Logger.log('Unit skipped')
    : describe('[Unit] NotSameEmailValidation', () => {
        const emailValidator = NotSameEmailValidation.validNotSameEmail('testEmail@gmail.com');
        const emailControl = new FormControl('');

        it(`should return null when value is an empty string`, () => {
            emailControl.setValue('');
            expect(emailValidator(emailControl)).toEqual(null);
        });

        it(`should return null when value is different`, () => {
            emailControl.setValue('newTestEmail@gmail.com');
            expect(emailValidator(emailControl)).toEqual(null);
        });

        it(`should return { sameEmail: 'Email must be different from current value.' } when value is same`, () => {
            emailControl.setValue('testEmail@gmail.com');
            const expectedValue = { sameEmail: `Email must be different from current value.` };
            expect(emailValidator(emailControl)).toEqual(expectedValue);
        });
    });