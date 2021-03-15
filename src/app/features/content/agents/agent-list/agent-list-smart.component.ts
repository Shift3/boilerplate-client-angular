import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';

import { AgentService } from '@core/services/api/agent.service';
import { ConfirmModalConfig } from '@models/modal';
import { IAgentDTO } from '@models/agent';
import { IRoleCheck } from '@models/role';
import { ModalService } from '@core/services/modal.service';
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  template: `
    <app-agent-list-presentation
      [agentList]="agentList$ | async"
      [checkRole]="checkRole$ | async"
      (emitDelete)="openDeleteModal($event)"
    ></app-agent-list-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentListSmartComponent implements OnInit {
  public emitGetAgentList = new EventEmitter<void>();
  public checkRole$: Observable<IRoleCheck>;
  public agentList$: Observable<IAgentDTO[]>;

  constructor(
    private agentService: AgentService,
    private modalService: ModalService,
    private userStateService: UserStateService,
  ) {}

  public ngOnInit(): void {
    this.getAgentList();
    this.checkRole$ = this.checkRoleList();
  }

  public checkRoleList(): Observable<IRoleCheck> {
    return this.userStateService.checkRoleList();
  }

  public openDeleteModal(agent: IAgentDTO): void {
    const modalConfig = new ConfirmModalConfig({
      message: {
        static: 'delete',
        dynamic: `${agent.name}?`,
      },
      action: 'Delete',
    });
    this.modalService.openConfirmModal(modalConfig).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.deleteAgent(agent);
      }
    });
  }

  private getAgentList(): void {
    this.agentList$ = merge(this.emitGetAgentList).pipe(
      startWith({}),
      switchMap(() => this.agentService.getAgentList()),
      catchError(() => observableOf([])),
    );
  }

  private deleteAgent(agent: IAgentDTO): void {
    this.agentService
      .deleteAgent(agent)
      .subscribe(() => this.emitGetAgentList.emit());
  }
}
