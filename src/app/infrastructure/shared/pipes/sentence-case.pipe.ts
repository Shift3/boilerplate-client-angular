import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sentenceCase' })
export class SentenceCasePipe implements PipeTransform {
  // Returns “camelCaseString” as “Camel Case String”
  public transform(value: string): string {
    if (!value) {
      return '';
    }

    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }
}
