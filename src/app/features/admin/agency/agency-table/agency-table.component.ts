import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IAgencyDTO } from '@models/agency';

@Component({
  selector: 'app-agency-table',
  templateUrl: './agency-table.component.html',
  styleUrls: ['./agency-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyTableComponent {
  @Input() public tableData: IAgencyDTO[] = [];

  @Output() public emitDelete = new EventEmitter<IAgencyDTO>();

  public deleteAgency(agency: IAgencyDTO): void {
    this.emitDelete.emit(agency);
  }
}
