import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IAgentDTO } from '@models/agent';

@Component({
  selector: 'app-agent-table',
  templateUrl: './agent-table.component.html',
  styleUrls: ['./agent-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentTableComponent {
  @Input() public tableData: any;

  @Output() public emitDelete = new EventEmitter<IAgentDTO>();

  public trackByColumnId(index: number, item: any): number | null {
    return (item) ? item.columnIndex : null;
  }

  public deleteAgent(agent: IAgentDTO): void {
    this.emitDelete.emit(agent);
  }
}
