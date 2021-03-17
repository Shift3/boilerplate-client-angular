import { NgModule } from '@angular/core';

import {
  AuthRoutingModule,
  components as authComponents,
} from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TranslocoRootModule } from '@app/transloco/transloco-root.module';

/**
 * Lazy loaded feature module for all auth-related components and dependencies.
 */
@NgModule({
  declarations: [authComponents],
  imports: [SharedModule, TranslocoRootModule, AuthRoutingModule],
})
export class AuthModule {}
