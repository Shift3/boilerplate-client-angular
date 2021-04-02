import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { NgbPopover, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { IAgentDTO } from '@models/agent';
import {
  IDynamicTableTranslationKey,
  DynamicTableTranslationKey,
} from '@models/translation/dynamic-table';
import { NgbPositionEnum } from '@models/enums';
import { IRoleCheck, RoleCheck } from '@models/role';
import { ITableConfig, TableConfig } from '@models/table';

@Component({
  selector: 'app-agent-table',
  templateUrl: './agent-table.component.html',
  styleUrls: ['./agent-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentTableComponent {
  @Input() public checkRole: IRoleCheck = new RoleCheck();
  @Input() public tableConfig: ITableConfig = new TableConfig();
  @Input() public tableData: IAgentDTO[] = [];

  @Output() public emitDelete = new EventEmitter<IAgentDTO>();
  @Output() public emitSelectLanguage = new EventEmitter<string>();

  public dynamicTableTranslationKeys: IDynamicTableTranslationKey = new DynamicTableTranslationKey();

  public deleteAgent(agent: IAgentDTO): void {
    this.emitDelete.emit(agent);
  }

  public selectLanguage(languageCode: string): void {
    this.emitSelectLanguage.emit(languageCode);
  }

  public openSelectLanguagePopover(
    popover: NgbPopover,
    agent: IAgentDTO,
  ): void {
    popover.placement = NgbPositionEnum.LEFT;
    popover.isOpen() ? popover.close() : popover.open({ agent });
  }

  public openSelectLanguageTooltip(tooltip: NgbTooltip): void {
    tooltip.placement = NgbPositionEnum.TOP;
    if (!tooltip.isOpen()) {
      tooltip.open();
    }
  }

  public closeSelectLanguageTooltip(tooltip: NgbTooltip): void {
    tooltip.placement = NgbPositionEnum.AUTO;
    if (tooltip.isOpen()) {
      tooltip.close();
    }
  }
}
