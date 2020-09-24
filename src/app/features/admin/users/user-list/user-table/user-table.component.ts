import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  IRoleCheck,
  RoleCheck,
} from '@models/role';
import {
  ITableConfig,
  TableConfig,
} from '@models/table';
import { IUserDTO } from '@models/user';
import { Utils } from '@utils/utils';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  @Input() public checkRole: IRoleCheck = new RoleCheck();
  @Input() public loggedInUser: IUserDTO;
  @Input() public tableConfig: ITableConfig = new TableConfig();
  @Input() public tableData: IUserDTO[] = [];

  @Output() public emitDelete = new EventEmitter<IUserDTO>();
  @Output() public emitResendActivationEmail = new EventEmitter<IUserDTO>();

  public trackById(index: number, item: IUserDTO): number | null {
    return Utils.trackByValue(index, item, 'id');
  }

  public deleteUser(user: IUserDTO): void {
    this.emitDelete.emit(user);
  }

  public isSelf(userId: number): boolean {
    return this.loggedInUser.id === userId;
  }

  public resendActivationEmail(user: IUserDTO): void {
    this.emitResendActivationEmail.emit(user);
  }
}
