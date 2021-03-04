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

import { TranslocoRootModule } from '@app/transloco/transloco-root.module';

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
    TranslocoRootModule,
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
  declarations: [components, directives, pipes],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
    };
  }
}
