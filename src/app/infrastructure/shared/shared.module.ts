import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BoostrapModule } from './imports/bootstrap.module';
import { components } from './components';
import { directives } from './directives';

/**
 * Connects modules, pipes, directives, components, dependencies, and more that do not need to be singleton instances.
 */
@NgModule({
  imports: [
    CommonModule,
    BoostrapModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    BoostrapModule,
    ReactiveFormsModule,
    components,
    directives,
  ],
  declarations: [
    components,
    directives,
  ],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
    };
  }
}
