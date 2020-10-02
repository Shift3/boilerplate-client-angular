import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { IFormConfig } from '@models/form/form';

/**
 * Methods to facilitate using Angular Reactive Forms.
 */
@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  /**
   * Creates `FormGroup` from the passed in `formConfig`. Currently a naive implementation.
   */
  public buildForm(formConfig: IFormConfig): FormGroup {
    const form = this.fb.group({});

    formConfig.controls.forEach((formField) => {
      formField.value = formField.value || '';
      return this.addFormControl(
        form,
        formField.name,
        formField.value.toString(),
        formField.validation,
        formField.disabled,
      );
    });
    form.setValidators(Validators.compose([...formConfig.validation]));

    return form;
  }

  /**
   * Will add a `FormControl` to the provided `FormGroup`.
   */
  public addFormControl(
    form: FormGroup,
    fieldName: string,
    fieldValue: string = '',
    validators: ValidatorFn[] = [],
    disabled: boolean = false,
  ): void {
    // Prevent collisions when creating form values.
    if (form.contains(fieldName)) {
      form.removeControl(fieldName);
    }

    return form.addControl(
      fieldName,
      new FormControl(
        { value: fieldValue, disabled },
        Validators.compose([...validators]),
      ),
    );
  }

  /**
   * Build a request payload from the matching `FormGroup` values.
   * Does not handle conditional logic.
   */
  public buildRequestPayload<T>(form: FormGroup, requestPayload: T): T {
    for (const property in requestPayload) {
      if (requestPayload.hasOwnProperty(property)) {
        if (form.controls[property] && form.controls[property].value) {
          requestPayload[property] = form.controls[property].value;
        }
      }
    }

    return requestPayload;
  }
}
