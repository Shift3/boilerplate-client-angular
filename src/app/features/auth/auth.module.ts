import { NgModule } from '@angular/core';

import {
  AuthRoutingModule,
  components as authRoutedComponents,
} from './auth-routing.module';

@NgModule({
  declarations: [ authRoutedComponents ],
  imports: [
    AuthRoutingModule,
  ],
})
export class AuthModule { }
