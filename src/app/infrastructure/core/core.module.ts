import {
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { ModuleImportGuard } from './guards/module-import.guard';
import { SharedModule } from '@shared/shared.module';

/**
 * Connects services, resolvers, guards, and more that must be singleton instances.
 */
@NgModule({
  imports: [
    SharedModule,
  ],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
