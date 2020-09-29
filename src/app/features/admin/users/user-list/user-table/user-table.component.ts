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
  @Output() public emitResetPassword = new EventEmitter<IUserDTO>();

  public deleteUser(user: IUserDTO): void {
    this.emitDelete.emit(user);
  }

  public isSelf(userId: number): boolean {
    return this.loggedInUser.id === userId;
  }

  public resendActivationEmail(user: IUserDTO): void {
    this.emitResendActivationEmail.emit(user);
  }

  public resetPassword(user: IUserDTO): void {
    this.emitResetPassword.emit(user);
  }
}
