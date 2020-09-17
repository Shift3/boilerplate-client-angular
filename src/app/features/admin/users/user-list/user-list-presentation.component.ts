import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  IRoleGuard,
  RoleGuard,
} from '@models/role';
import { IUserDTO } from '@models/user';

@Component({
  selector: 'app-user-list-presentation',
  templateUrl: './user-list-presentation.component.html',
  styleUrls: ['./user-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPresentationComponent {
  @Input() public checkRole: IRoleGuard = new RoleGuard();
  @Input() public loggedInUser: IUserDTO;
  @Input() public userList: IUserDTO[];

  @Output() public emitDelete = new EventEmitter<IUserDTO>();
  @Output() public emitResendActivationEmail = new EventEmitter<IUserDTO>();

  public deleteUser(user: IUserDTO): void {
    this.emitDelete.emit(user);
  }

  public resendActivationEmail(user: IUserDTO): void {
    this.emitResendActivationEmail.emit(user);
  }
}
