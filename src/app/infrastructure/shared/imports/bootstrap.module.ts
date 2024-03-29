import { NgModule } from '@angular/core';
import {
  NgbAlertModule,
  NgbButtonsModule,
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

/**
 * Loads only used Bootstrap modules.
 */
@NgModule({
  imports: [
    NgbAlertModule,
    NgbButtonsModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbToastModule,
  ],
  exports: [
    NgbAlertModule,
    NgbButtonsModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbToastModule,
  ],
})
export class BootstrapModule {}

/**
 * Loads only used NgxBootstrap modules.
 */
@NgModule({
  imports: [TooltipModule.forRoot()],
  exports: [TooltipModule],
})
export class NgxBootstrapModule {
  static forRoot() {
    return {
      ngModule: NgxBootstrapModule,
    };
  }
}
