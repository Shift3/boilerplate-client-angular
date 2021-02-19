import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxMaskModule } from 'ngx-mask';

import {
  BootstrapModule,
  NgxBootstrapModule,
} from './imports/bootstrap.module';
import { components } from './components';
import { directives } from './directives';
import { pipes } from './pipes';
import { LanguageSettingsComponent } from './components/navigation/language-settings/language-settings.component';

/**
 * Connects modules, pipes, directives, components, dependencies, and more that do not need to be singleton instances.
 */
@NgModule({
  imports: [
    CommonModule,
    BootstrapModule,
    NgxBootstrapModule.forRoot(),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    BootstrapModule,
    NgxBootstrapModule,
    ReactiveFormsModule,
    components,
    directives,
    pipes,
  ],
  declarations: [components, directives, pipes, LanguageSettingsComponent],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
    };
  }
}
