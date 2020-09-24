import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class MatchFieldValidation {
  static validFieldMatch(controlName: string, confirmControlName: string, fieldName: string = 'Email'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue: unknown | null = control.get(controlName).value;
      const confirmControlValue: unknown | null = control.get(confirmControlName).value;

      if (!confirmControlValue) {
        control.get(confirmControlName).setErrors({ confirmFieldRequired: `Confirm ${fieldName} is required.` });
      }

      if (controlValue !== confirmControlValue) {
        control.get(confirmControlName).setErrors({ fieldsMismatched: `${fieldName} fields do not match.` });
      }

      if (controlValue && (controlValue === confirmControlValue)) {
        control.get(confirmControlName).setErrors(null);
      }

      return null;
    };
  }
}
