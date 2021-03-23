import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  IDynamicForm,
  DynamicForm,
} from '@models/translation/dynamic-form/dynamic-form';
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

  private dynamicForm: IDynamicForm = new DynamicForm();
  public addButtonText: string = this.dynamicForm.action.addUser;

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
