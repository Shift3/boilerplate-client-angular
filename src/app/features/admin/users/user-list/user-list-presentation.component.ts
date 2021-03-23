import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  IDynamicFormAction,
  DynamicFormAction,
} from '@models/translation/dynamic-form/action';
import { IRoleCheck, RoleCheck } from '@models/role';
import { IUserDTO } from '@models/user';

@Component({
  selector: 'app-user-list-presentation',
  templateUrl: './user-list-presentation.component.html',
  styleUrls: ['./user-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPresentationComponent {
  @Input() public checkRole: IRoleCheck = new RoleCheck();
  @Input() public loggedInUser: IUserDTO;
  @Input() public userList: IUserDTO[];

  @Output() public emitDelete = new EventEmitter<IUserDTO>();
  @Output() public emitResendActivationEmail = new EventEmitter<IUserDTO>();
  @Output() public emitResetPassword = new EventEmitter<IUserDTO>();

  private dynamicFormAction: IDynamicFormAction = new DynamicFormAction();
  public addButtonText: string = this.dynamicFormAction.addUser;

  public deleteUser(user: IUserDTO): void {
    this.emitDelete.emit(user);
  }

  public resendActivationEmail(user: IUserDTO): void {
    this.emitResendActivationEmail.emit(user);
  }
  public resetPassword(user: IUserDTO): void {
    this.emitResetPassword.emit(user);
  }
}
