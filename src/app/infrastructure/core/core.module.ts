import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptorService } from './services/api-interceptor.service';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { ModuleImportGuard } from './guards/module-import.guard';
import { SharedModule } from '@shared/shared.module';

/**
 * Connects services, resolvers, guards, and more that must be singleton instances.
 */
@NgModule({
  imports: [SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
