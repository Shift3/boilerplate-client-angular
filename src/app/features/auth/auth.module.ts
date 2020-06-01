import { NgModule } from '@angular/core';

import {
  AuthRoutingModule,
  components as authComponents,
} from './auth-routing.module';

/**
 * Lazy loaded feature module for all auth-related components and dependencies.
 */
@NgModule({
  declarations: [ authComponents ],
  imports: [
    AuthRoutingModule,
  ],
})
export class AuthModule { }
