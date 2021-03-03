import { Injectable, NgModule } from '@angular/core';
import {
  TRANSLOCO_LOADER,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';

import { ApiService } from '@core/services/api/api.service';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private apiService: ApiService) {}

  getTranslation(lang: string) {
    return this.apiService.getTranslation(lang);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en-US', 'es-ES', 'tl', 'vi-VN'],
        defaultLang: 'en-US',
        fallbackLang: 'en-US', // Dictates what language to use if you don’t have any particular translation label.
        reRenderOnLangChange: true, // Remove this option if your application doesn't support changing language in runtime.
        prodMode: environment.production,
        flatten: {
          aot: environment.production,
        },
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
