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
import {
  IConfirmationModalTranslationKey,
  ConfirmationModalTranslationKey,
} from '@models/translation/confirmation-modal';
import { IRoleCheck } from '@models/role';
import { LanguageStateService } from '@core/services/state/language-state.service';
import { ModalService } from '@core/services/modal.service';
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  template: `
    <app-agent-list-presentation
      [agentList]="agentList$ | async"
      [checkRole]="checkRole$ | async"
      [dynamicLanguageForTranslation]="dynamicLanguageForTranslation$ | async"
      (emitDelete)="openDeleteModal($event)"
    ></app-agent-list-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentListSmartComponent implements OnInit {
  public emitGetAgentList = new EventEmitter<void>();
  public agentList$: Observable<IAgentDTO[]>;
  public checkRole$: Observable<IRoleCheck>;
  public dynamicLanguageForTranslation$: Observable<string>;

  constructor(
    private agentService: AgentService,
    private languageStateService: LanguageStateService,
    private modalService: ModalService,
    private userStateService: UserStateService,
  ) {}

  public ngOnInit(): void {
    this.getAgentList();
    this.checkRole$ = this.checkRoleList();
    this.dynamicLanguageForTranslation$ = this.getDynamicLanguageForTranslation();
  }

  public checkRoleList(): Observable<IRoleCheck> {
    return this.userStateService.checkRoleList();
  }

  public openDeleteModal(agent: IAgentDTO): void {
    const confirmationModalTranslationKeys: IConfirmationModalTranslationKey = new ConfirmationModalTranslationKey();
    const modalConfig = new ConfirmModalConfig({
      message: {
        static: confirmationModalTranslationKeys.title.delete,
        dynamic: `${agent.name}?`,
      },
      action: confirmationModalTranslationKeys.action.delete,
    });
    this.modalService.openConfirmModal(modalConfig).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.deleteAgent(agent);
      }
    });
  }

  private getDynamicLanguageForTranslation() {
    return this.languageStateService.getDynamicLanguageForTranslation();
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
