import { Pipe, PipeTransform } from '@angular/core';

import { Logger } from '@utils/logger';
import { translocoConfigObj } from '@app/transloco/transloco-config';

@Pipe({ name: 'localeuppercase' })
export class LocaleUpperCasePipe implements PipeTransform {
  transform(value: string, language?: string): string;
  transform(value: null | undefined, language?: string): null;
  transform(value: string | null | undefined, language?: string): string | null;
  transform(
    value: string | null | undefined,
    language?: string,
  ): string | null {
    if (!value || typeof value !== 'string') {
      return '';
    }
    const locale = language || translocoConfigObj.defaultLang;

    try {
      return value.toLocaleUpperCase(locale);
    } catch (error) {
      Logger.warn(error);
      return value.toLocaleUpperCase(translocoConfigObj.defaultLang);
    }
  }
}
