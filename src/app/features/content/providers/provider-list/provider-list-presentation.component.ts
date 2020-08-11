import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAgentDTO } from '@models/agent';

@Component({
  selector: 'app-provider-list-presentation',
  templateUrl: './provider-list-presentation.component.html',
  styleUrls: ['./provider-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderListPresentationComponent {
  @Input() public providerList: IAgentDTO;

  @Output() public emitDelete = new EventEmitter<IAgentDTO>();

  public deleteProvider(provider: IAgentDTO): void {
    this.emitDelete.emit(provider);
  }
}
