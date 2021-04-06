import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AgentService } from '@core/services/api/agent.service';
import { ConfirmModalConfig } from '@models/modal';
import { IAgentDTO } from '@models/agent';
import {
  IConfirmationModalTranslationKey,
  ConfirmationModalTranslationKey,
} from '@models/translation/confirmation-modal';
import { IRoleCheck } from '@models/role';
import { ISelectedLanguage } from '@models/translation/translation';
import { ModalService } from '@core/services/modal.service';
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  template: `
    <app-agent-list-presentation
      [agentList]="agentList$ | async"
      [checkRole]="checkRole$ | async"
      (emitDelete)="openDeleteModal($event)"
      (emitSelectLanguage)="selectLanguage($event)"
    ></app-agent-list-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentListSmartComponent implements OnInit {
  public agentList$: Observable<IAgentDTO[]>;
  public emitGetAgentList = new EventEmitter<void>();
  public checkRole$: Observable<IRoleCheck>;
  public dynamicLanguageForTranslation$: Observable<string>;

  constructor(
    private agentService: AgentService,
    private modalService: ModalService,
    private router: Router,
    private translocoService: TranslocoService,
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

  public selectLanguage(selectedLanguage: ISelectedLanguage): void {
    this.router.navigateByUrl(
      `/content/set-translation/${selectedLanguage.id}/${selectedLanguage.languageCode}`,
    );
  }

  /**
   * Listens to the latest values from the agent list response
   * and active language streams and uses them to unpack the translation for the table.
   */
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
