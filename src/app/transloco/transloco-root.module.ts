import { Injectable, NgModule } from '@angular/core';

import {
  TRANSLOCO_LOADER,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import {
  TranslocoPersistLangModule,
  TRANSLOCO_PERSIST_LANG_STORAGE,
} from '@ngneat/transloco-persist-lang';

import { ApiService } from '@core/services/api/api.service';
import { translocoConfigObj } from './transloco-config';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private apiService: ApiService) {}

  getTranslation(lang: string) {
    return this.apiService.getTranslation(lang);
  }
}

@NgModule({
  exports: [TranslocoModule],
  imports: [
    TranslocoModule,
    TranslocoPersistLangModule.init({
      storage: {
        provide: TRANSLOCO_PERSIST_LANG_STORAGE,
        useValue: localStorage,
      },
    }),
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig(translocoConfigObj),
    },
    {
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader,
    },
  ],
})
export class TranslocoRootModule {}
