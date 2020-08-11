import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IAgentDTO } from '@models/agent';

@Component({
  selector: 'app-provider-table',
  templateUrl: './provider-table.component.html',
  styleUrls: ['./provider-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderTableComponent {
  @Input() public tableData: any;

  @Output() public emitDelete = new EventEmitter<IAgentDTO>();

  public trackByColumnId(index: number, item: any): number | null {
    return (item) ? item.columnIndex : null;
  }

  public deleteProvider(provider: IAgentDTO): void {
    this.emitDelete.emit(provider);
  }
}
