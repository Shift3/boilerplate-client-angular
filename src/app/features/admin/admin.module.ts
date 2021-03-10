import { NgModule } from '@angular/core';

import {
  AdminRoutingModule,
  components as adminComponents,
} from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TranslocoRootModule } from '@app/transloco/transloco-root.module';

@NgModule({
  declarations: [adminComponents],
  imports: [SharedModule, TranslocoRootModule, AdminRoutingModule],
})
export class AdminModule {}
