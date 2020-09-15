import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';

import {
  merge,
  Observable,
  of as observableOf,
} from 'rxjs';
import {
  catchError,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import { AgencyService } from '@core/services/api/agency.service';
import { ConfirmModalConfig } from '@models/modal';
import { IAgencyDTO } from '@models/agency';
import { ModalService } from '@core/services/modal.service';

@Component({
  template: `
    <app-agency-list-presentation
      [agencyList]="(agencyList$ | async)"
      (emitDelete)="openDeleteModal($event)"
    ></app-agency-list-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyListSmartComponent implements OnInit {
  public emitGetAgencyList = new EventEmitter<void>();
  public isLoaded: boolean = false;
  public isLoadingResults: boolean = false;
  public agencyList$: Observable<IAgencyDTO[]>;

  constructor(
    private agencyService: AgencyService,
    private modalService: ModalService,
  ) { }

  public ngOnInit(): void {
    this.getAgencyList();
  }

  public openDeleteModal(agency: IAgencyDTO): void {
    const modalConfig = new ConfirmModalConfig({
      message: `Delete ${agency.agencyName}?`,
      action: 'Delete',
    });
    this.modalService.openConfirmModal(modalConfig).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.deleteAgency(agency);
      }
    });
  }

  private getAgencyList(): void {
    this.agencyList$ = merge(this.emitGetAgencyList).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.agencyService.getAgencyList();
      }),
      tap(() => this.isLoaded = true),
      tap(() => this.isLoadingResults = false),
      catchError(() => {
        this.isLoadingResults = false;
        return observableOf([]);
      }),
    );
  }

  private deleteAgency(agency: IAgencyDTO): void {
    this.agencyService.deleteAgency(agency).subscribe(() => this.emitGetAgencyList.emit());
  }
}
