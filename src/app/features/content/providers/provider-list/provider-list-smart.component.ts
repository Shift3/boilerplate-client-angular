import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

import { AgentService } from '@core/services/api/agent.service';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import {
  ConfirmModalConfig,
  IConfirmModalConfig,
} from '@models/modal';
import { IAgentDTO } from '@models/agent';

@Component({
  template: `
    <app-provider-list-presentation
      [providerList]="(providerList$ | async)"
      (emitDelete)="openDeleteModal($event)"
    ></app-provider-list-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderListSmartComponent implements OnInit {
  public emitGetProviderList = new EventEmitter<void>();
  public isLoaded: boolean = false;
  public isLoadingResults: boolean = false;
  public providerList$: Observable<IAgentDTO[]>;

  constructor(
    private agentService: AgentService,
    private modalService: NgbModal,
  ) { }

  public ngOnInit(): void {
    this.getProviderList();
  }

  public openDeleteModal(provider: IAgentDTO): void {
    const modalConfig = new ConfirmModalConfig({
      message: `Delete ${provider.name}?`,
      action: 'Delete',
    });
    const modalRef = this.modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.modalConfig = modalConfig;
    modalRef.result.then((result: IConfirmModalConfig) => {
      if (result) {
        this.deleteProvider(provider);
      }
    });
  }

  private getProviderList(): void {
    this.providerList$ = merge(this.emitGetProviderList).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.agentService.getAgentList();
      }),
      tap(() => this.isLoaded = true),
      tap(() => this.isLoadingResults = false),
      catchError(() => {
        this.isLoadingResults = false;
        return observableOf([]);
      }),
    );
  }

  private deleteProvider(provider: IAgentDTO): void {
    this.agentService.deleteAgent(provider).subscribe(() => this.emitGetProviderList.emit());
  }
}
