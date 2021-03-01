import { Pipe, PipeTransform } from '@angular/core';
/*
 * Converts camelCase string to Sentence Case string
 * Takes a string as a value.
 * Usage:
 *  value | sentenceCase
 * Example:
 *  // value.name = firstName
 *  {{ value.name | sentenceCase  }}
 *  formats to: First Name
 */
@Pipe({
  name: 'sentenceCase',
})
export class SentenceCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const result: string = value.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
