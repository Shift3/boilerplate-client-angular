import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import {
  AppRoutingModule,
  components as mainComponents,
} from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

/**
 * Root feature module.
 */
@NgModule({
  declarations: [
    AppComponent,
    mainComponents,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    SharedModule.forRoot(),
    // AppRoutingModule must be loaded last.
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
