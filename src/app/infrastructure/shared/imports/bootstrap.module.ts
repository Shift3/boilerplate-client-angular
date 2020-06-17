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
export class BoostrapModule { }
