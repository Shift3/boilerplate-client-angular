import { Pipe, PipeTransform } from '@angular/core';

import { TranslocoService } from '@ngneat/transloco';

import { translocoConfigObj } from '@app/transloco/transloco-config';
import { Logger } from '@app/infrastructure/utils/logger';

@Pipe({ name: 'localeuppercase' })
export class LocaleUpperCasePipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}
  transform(value: string, language?: string): string;
  transform(value: null | undefined, language?: string): null;
  transform(value: string | null | undefined, language?: string): string | null;
  transform(
    value: string | null | undefined,
    language?: string,
  ): string | null {
    if (value == null) return null;
    if (typeof value !== 'string') {
      return '';
    }
    const locale =
      language ||
      this.translocoService.getActiveLang() ||
      translocoConfigObj.defaultLang ||
      'en-US';

    try {
      return value.toLocaleUpperCase(locale);
    } catch (error) {
      Logger.warn(error);
      return value.toLocaleUpperCase();
    }
  }
}
