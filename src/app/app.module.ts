import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { tap } from 'rxjs/operators';
import { ToastrModule } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

import {
  AppRoutingModule,
  components as mainComponents,
} from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { translocoConfigObj } from '@app/transloco/transloco-config';
import { TranslocoRootModule } from '@app/transloco/transloco-root.module';
import { IUserDTO } from '@models/user';
import { UserStateService } from '@core/services/state/user-state.service';

export function preloadUserSettings(
  userStateService: UserStateService,
  transloco: TranslocoService,
) {
  return () => {
    return userStateService.getUserSession().pipe(
      tap((user: IUserDTO) => {
        userStateService.setUserSettings(user.settings);

        const preferredLang: string =
          user.settings.language?.languageCode ||
          translocoConfigObj.defaultLang;

        return transloco.load(preferredLang).toPromise();
      }),
    );
  };
}

/**
 * Root feature module.
 */
@NgModule({
  declarations: [AppComponent, mainComponents],
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    SharedModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    TranslocoRootModule,
    // AppRoutingModule must be loaded last.
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: preloadUserSettings,
      deps: [UserStateService, TranslocoService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
