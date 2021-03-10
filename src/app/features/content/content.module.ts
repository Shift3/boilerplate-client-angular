import { NgModule } from '@angular/core';

import {
  ContentRoutingModule,
  components as contentComponents,
} from './content-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TranslocoRootModule } from '@app/transloco/transloco-root.module';

/**
 * Lazy loaded feature module for all content-related components and dependencies.
 */
@NgModule({
  declarations: [contentComponents],
  imports: [SharedModule, TranslocoRootModule, ContentRoutingModule],
})
export class ContentModule {}
