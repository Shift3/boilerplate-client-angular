import { Injectable, NgModule, APP_INITIALIZER } from '@angular/core';

import {
  TRANSLOCO_LOADER,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
  TranslocoService,
} from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import {
  TranslocoPersistLangModule,
  TRANSLOCO_PERSIST_LANG_STORAGE,
} from '@ngneat/transloco-persist-lang';
import { tap } from 'rxjs/operators';

import { ApiService } from '@core/services/api/api.service';
import { translocoConfigObj } from './transloco-config';
import { UserDTO } from '@models/user';
import { UserStateService } from '@core/services/state/user-state.service';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private apiService: ApiService) {}

  getTranslation(lang: string) {
    return this.apiService.getTranslation(lang);
  }
}

export function preloadUserLanguage(
  userStateService: UserStateService,
  transloco: TranslocoService,
) {
  return () => {
    return userStateService.getUserSession().pipe(
      tap((user: UserDTO) => {
        console.log(user);
        const preferredLang: string =
          user.settings?.language?.languageCode ||
          translocoConfigObj.defaultLang;

        transloco.setActiveLang(preferredLang);
        return transloco.load(preferredLang).toPromise();
      }),
    );
  };
}

@NgModule({
  exports: [TranslocoModule, TranslocoLocaleModule],
  imports: [
    TranslocoModule,
    TranslocoLocaleModule.init(),
    TranslocoPersistLangModule.init({
      // add a function call here to fetch language from user-settings model
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
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: preloadUserLanguage,
      deps: [UserStateService, TranslocoService],
    },
  ],
})
export class TranslocoRootModule {}
