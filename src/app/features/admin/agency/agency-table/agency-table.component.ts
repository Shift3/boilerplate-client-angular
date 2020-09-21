import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgencyDTO } from '@models/agency';
import {
  ITableConfig,
  TableConfig,
} from '@models/table';

@Component({
  selector: 'app-agency-table',
  templateUrl: './agency-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyTableComponent {
  @Input() public tableData: IAgencyDTO[] = [];
  @Input() public tableConfig: ITableConfig = new TableConfig();

  @Output() public emitDelete = new EventEmitter<IAgencyDTO>();

  public deleteAgency(agency: IAgencyDTO): void {
    this.emitDelete.emit(agency);
  }
}
