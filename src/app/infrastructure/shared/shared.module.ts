import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BootstrapModule,
  NgxBootstrapModule,
} from './imports/bootstrap.module';
import { NgxMaskModule } from 'ngx-mask';
import { TranslocoModule } from '@ngneat/transloco';

import { components } from './components';
import { directives } from './directives';
import { pipes } from './pipes';

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
    TranslocoModule,
  ],
  exports: [
    CommonModule,
    BootstrapModule,
    NgxBootstrapModule,
    ReactiveFormsModule,
    TranslocoModule,
    components,
    directives,
    pipes,
  ],
  declarations: [components, directives, pipes],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
    };
  }
}
