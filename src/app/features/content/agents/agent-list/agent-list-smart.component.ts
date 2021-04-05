import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { combineLatest, Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AgentService } from '@core/services/api/agent.service';
import { ConfirmModalConfig } from '@models/modal';
import { IAgentDTO } from '@models/agent';
import {
  IConfirmationModal,
  ConfirmationModal,
} from '@models/translation/confirmation-modal';
import { IRoleCheck } from '@models/role';
import { LanguageStateService } from '@core/services/state/language-state.service';
import { ModalService } from '@core/services/modal.service';
import { UserStateService } from '@core/services/state/user-state.service';
import { TranslocoService } from '@ngneat/transloco';

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
    private translocoService: TranslocoService,
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
    const confirmationModal: IConfirmationModal = new ConfirmationModal();
    const modalConfig = new ConfirmModalConfig({
      message: {
        static: confirmationModal.title.delete,
        dynamic: `${agent.name}?`,
      },
      action: confirmationModal.action.delete,
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
    this.agentList$ = combineLatest([
      this.agentService.getAgentList(),
      this.translocoService.langChanges$,
    ]).pipe(
      map(([agentList, activeLanguage]) =>
        this.getTranslatedAgentList(agentList, activeLanguage),
      ),
      catchError(() => observableOf([])),
    );
  }

  private getTranslatedAgentList(
    agentList: IAgentDTO[],
    languageCode: string,
  ): IAgentDTO[] {
    return this.agentService.getTranslatedAgentList(agentList, languageCode);
  }

  private deleteAgent(agent: IAgentDTO): void {
    this.agentService
      .deleteAgent(agent)
      .subscribe(() => this.emitGetAgentList.emit());
  }
}
