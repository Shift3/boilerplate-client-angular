import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';

import { IAgentDTO } from '@models/agent';
import { IRoleCheck, RoleCheck } from '@models/role';
import { ITableConfig, TableConfig } from '@models/table';
import { Paginated } from '@app/infrastructure/core/services/api/agent.service';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agent-table',
  templateUrl: './agent-table.component.html',
  styleUrls: ['./agent-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentTableComponent implements OnInit {
  @Input() public checkRole: IRoleCheck = new RoleCheck();
  @Input() public tableConfig: ITableConfig = new TableConfig();
  @Input() public tableData: Paginated<IAgentDTO> = null;
  @Input() public sort: any;

  @Output() public emitDelete = new EventEmitter<IAgentDTO>();
  @Output() public emitSortColumnChange = new EventEmitter<string>();
  @Output() public emitPageChange = new EventEmitter<string>();
  @Output() public emitSearchChange = new EventEmitter<string>();

  searchForm: FormGroup = new FormGroup({
    search: new FormControl(),
  });
  searchForm$: Subscription;

  ngOnInit() {
    this.searchForm$ = this.searchForm.valueChanges
      .pipe(debounceTime(250))
      .subscribe((data) => {
        this.emitSearchChange.emit(data.search);
      });
  }

  public deleteAgent(agent: IAgentDTO): void {
    this.emitDelete.emit(agent);
  }

  public changePage(endpoint: string) {
    this.emitPageChange.emit(endpoint);
  }

  public sortColumnToggle(name: string) {
    this.emitSortColumnChange.emit(name);
  }
}
