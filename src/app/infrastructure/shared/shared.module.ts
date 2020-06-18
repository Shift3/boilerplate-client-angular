import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BoostrapModule } from './imports/bootstrap.module';
import { components } from './components';
import { directives } from './directives';
import { pipes } from './pipes';

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
    pipes,
  ],
  declarations: [
    components,
    directives,
    pipes,
  ],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
    };
  }
}
