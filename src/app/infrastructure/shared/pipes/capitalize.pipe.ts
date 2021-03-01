import { Pipe, PipeTransform } from '@angular/core';
/*
 * Capitalize the first letter of the string
 * Takes a string as a value.
 * Usage:
 *  value | capitalize
 * Example:
 *  // value.name = daniel
 *  {{ value.name | capitalize  }}
 *  formats to: Daniel
 */
@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
