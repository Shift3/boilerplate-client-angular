import { NgModule } from '@angular/core';

import {
  AdminRoutingModule,
  components as adminComponents,
} from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ adminComponents ],
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
})
export class AdminModule { }
