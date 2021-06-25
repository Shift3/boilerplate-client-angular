import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import {
  AppRoutingModule,
  components as mainComponents,
} from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { TranslocoRootModule } from '@app/transloco/transloco-root.module';

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
  bootstrap: [AppComponent],
})
export class AppModule {}
