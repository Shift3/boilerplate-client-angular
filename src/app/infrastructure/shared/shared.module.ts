import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Connects modules, pipes, directives, components, and more that do not need to be singleton instances.
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
    };
  }
}
