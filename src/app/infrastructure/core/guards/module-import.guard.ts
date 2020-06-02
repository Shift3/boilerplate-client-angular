import { CoreModule } from '../core.module';

/**
 * Ensures that `CoreModule` is imported only once.
 */
export class ModuleImportGuard {
  static throwIfAlreadyLoaded(parentModule: CoreModule, moduleName: string): void {
    if (parentModule) {
      throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
