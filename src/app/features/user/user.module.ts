import { NgModule } from '@angular/core';

import {
  UserRoutingModule,
  components as userComponents,
} from './user-routing.module';
import { SharedModule } from '@shared/shared.module';

/**
 * Lazy loaded feature module for all user-related components and dependencies.
 */
@NgModule({
  declarations: [ userComponents ],
  imports: [
    SharedModule,
    UserRoutingModule,
  ],
})
export class UserModule { }
