import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formError' })
export class FormErrorPipe implements PipeTransform {
  // Returns the first error value in the `AbstractControl` error object
  // Expects an object with string or boolean key-value pairs
  public transform(value: string | object): string {
    if (!value) {
      return '';
    }
    if (typeof value !== 'object') {
      return value;
    }
    const key: string = value[Object.keys(value)[0]];

    return key;
  }
}
