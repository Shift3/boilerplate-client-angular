import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IUserDTO } from '@models/user';

@Component({
  selector: 'app-user-list-presentation',
  templateUrl: './user-list-presentation.component.html',
  styleUrls: ['./user-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPresentationComponent {
  @Input() public loggedInUser: IUserDTO;
  @Input() public userList: IUserDTO[];

  @Output() public emitDelete = new EventEmitter<IUserDTO>();

  public deleteUser(user: IUserDTO): void {
    this.emitDelete.emit(user);
  }
}
