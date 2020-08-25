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
import { IRoleGuard } from '@models/role';
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  template: `
    <app-agent-list-presentation
      [agentList]="(agentList$ | async)"
      [checkRole]="(checkRole$ | async)"
      (emitDelete)="openDeleteModal($event)"
    ></app-agent-list-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentListSmartComponent implements OnInit {
  public emitGetAgentList = new EventEmitter<void>();
  public checkRole$: Observable<IRoleGuard>;
  public isLoaded: boolean = false;
  public isLoadingResults: boolean = false;
  public agentList$: Observable<IAgentDTO[]>;

  constructor(
    private agentService: AgentService,
    private modalService: NgbModal,
    private userStateService: UserStateService,
  ) { }

  public ngOnInit(): void {
    this.getAgentList();
    this.checkRole$ = this.checkRoleGuard();
  }

  public checkRoleGuard(): Observable<IRoleGuard> {
    return this.userStateService.checkRoleGuard();
  }

  public openDeleteModal(agent: IAgentDTO): void {
    const modalConfig = new ConfirmModalConfig({
      message: `Delete ${agent.name}?`,
      action: 'Delete',
    });
    const modalRef = this.modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.modalConfig = modalConfig;
    modalRef.result.then((result: IConfirmModalConfig) => {
      if (result) {
        this.deleteAgent(agent);
      }
    });
  }

  private getAgentList(): void {
    this.agentList$ = merge(this.emitGetAgentList).pipe(
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

  private deleteAgent(agent: IAgentDTO): void {
    this.agentService.deleteAgent(agent).subscribe(() => this.emitGetAgentList.emit());
  }
}
