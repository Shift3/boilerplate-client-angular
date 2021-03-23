import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgencyDTO } from '@models/agency';
import {
  IDynamicForm,
  DynamicForm,
} from '@models/translation/dynamic-form/dynamic-form';

@Component({
  selector: 'app-agency-list-presentation',
  templateUrl: './agency-list-presentation.component.html',
  styleUrls: ['./agency-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyListPresentationComponent {
  @Input() public agencyList: IAgencyDTO;

  @Output() public emitDelete = new EventEmitter<IAgencyDTO>();

  private dynamicForm: IDynamicForm = new DynamicForm();
  public addButtonText: string = this.dynamicForm.action.addAgency;

  public deleteAgency(agency: IAgencyDTO): void {
    this.emitDelete.emit(agency);
  }
}
