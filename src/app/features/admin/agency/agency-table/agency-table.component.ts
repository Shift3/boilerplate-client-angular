import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgencyDTO } from '@models/agency';
import {
  IDynamicTableTranslationKey,
  DynamicTableTranslationKey,
} from '@models/translation/dynamic-table';
import { ITableConfig, TableConfig } from '@models/table';

@Component({
  selector: 'app-agency-table',
  templateUrl: './agency-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyTableComponent {
  @Input() public tableData: IAgencyDTO[] = [];
  @Input() public tableConfig: ITableConfig = new TableConfig();

  @Output() public emitDelete = new EventEmitter<IAgencyDTO>();

  public dynamicTableTranslationKeys: IDynamicTableTranslationKey = new DynamicTableTranslationKey();

  public deleteAgency(agency: IAgencyDTO): void {
    this.emitDelete.emit(agency);
  }
}
