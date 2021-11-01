import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';

import { AgentService, Paginated } from '@core/services/api/agent.service';
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
      [sort]="sort"
      (emitDelete)="openDeleteModal($event)"
      (emitSortColumnChange)="sortColumnChange($event)"
      (emitSearchChange)="searchChange($event)"
      (emitPageChange)="pageChange($event)"
    ></app-agent-list-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentListSmartComponent implements OnInit {
  public emitGetAgentList = new EventEmitter<void>();
  public checkRole$: Observable<IRoleCheck>;
  public agentList$: Observable<Paginated<IAgentDTO>>;

  public sort: any = {
    name: 1,
  };
  public query: string = null;

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

  public searchChange(query: string) {
    this.query = query;
    this.getAgentList();
  }

  public sortColumnChange(column: string) {
    this.sort = { ...this.sort };
    if (this.sort[column]) {
      this.sort = {
        [column]: this.sort[column] == 1 ? -1 : 1,
      };
    } else {
      this.sort = {
        [column]: 1,
      };
    }

    this.getAgentList();
  }

  public pageChange(endpoint: string) {
    this.getAgentList(endpoint);
  }

  public openDeleteModal(agent: IAgentDTO): void {
    const modalConfig = new ConfirmModalConfig({
      message: `Delete ${agent.name}?`,
      action: 'Delete',
    });
    this.modalService.openConfirmModal(modalConfig).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.deleteAgent(agent);
      }
    });
  }

  private getAgentList(endpoint?: string): void {
    this.agentList$ = merge(this.emitGetAgentList).pipe(
      startWith({}),
      switchMap(() =>
        this.agentService.getAgentList(this.sort, this.query, endpoint),
      ),
      catchError(() => observableOf(null)),
    );
  }

  private deleteAgent(agent: IAgentDTO): void {
    this.agentService
      .deleteAgent(agent)
      .subscribe(() => this.emitGetAgentList.emit());
  }
}
