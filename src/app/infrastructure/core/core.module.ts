import {
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { ModuleImportGuard } from './guards/module-import.guard';

/**
 * Connects services, resolvers, guards, and more that must be singleton instances.
 */
@NgModule({ })
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
