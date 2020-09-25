import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/features/app/app.module';
import { environment } from '@env/environment';

if (environment.production) {
  enableProdMode();
}

/* tslint:disable:no-console */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
