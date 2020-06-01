import { NgModule } from '@angular/core';

import {
  AuthRoutingModule,
  components as authComponents,
} from './auth-routing.module';

@NgModule({
  declarations: [ authComponents ],
  imports: [
    AuthRoutingModule,
  ],
})
export class AuthModule { }
