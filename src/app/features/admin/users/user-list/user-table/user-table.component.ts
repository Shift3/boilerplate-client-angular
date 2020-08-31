import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IUserDTO } from '@app/infrastructure/models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  @Input() public loggedInUser: IUserDTO;
  @Input() public tableData: any;

  @Output() public emitDelete = new EventEmitter<IUserDTO>();

  public trackByColumnId(index: number, item: any): number | null {
    return (item) ? item.columnIndex : null;
  }

  public deleteUser(user: IUserDTO): void {
    this.emitDelete.emit(user);
  }
}
