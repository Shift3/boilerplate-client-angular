import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgencyDTO } from '@models/agency';
import {
  IDynamicFormAction,
  DynamicFormAction,
} from '@models/translation/dynamic-form/action';

@Component({
  selector: 'app-agency-list-presentation',
  templateUrl: './agency-list-presentation.component.html',
  styleUrls: ['./agency-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyListPresentationComponent {
  @Input() public agencyList: IAgencyDTO[];

  @Output() public emitDelete = new EventEmitter<IAgencyDTO>();

  private dynamicFormAction: IDynamicFormAction = new DynamicFormAction();
  public addButtonText: string = this.dynamicFormAction.addAgency;

  public deleteAgency(agency: IAgencyDTO): void {
    this.emitDelete.emit(agency);
  }
}
