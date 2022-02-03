import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class NotSameEmailValidation {
    static validNotSameEmail(email: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            if (control.value === email) {
                return { sameEmail: `Email must be different from current value.` };
            }

            return null;
        }
    }
}