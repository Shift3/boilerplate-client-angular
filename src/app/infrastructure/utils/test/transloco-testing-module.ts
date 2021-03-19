import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@ngneat/transloco';

import * as langs from '@assets/i18n/index';
import { translocoConfigObj } from '@app/transloco/transloco-config';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs,
    translocoConfig: {
      availableLangs: translocoConfigObj.availableLangs,
      defaultLang: translocoConfigObj.defaultLang,
    },
    preloadLangs: true,
    ...options,
  });
}
