import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { INavigation } from '@models/navigation';
import {
  IUserDTO,
  UserDTO,
} from '@models/user';
import { Utils } from '@utils/utils';

@Component({
  selector: 'app-top-navigation-presentation',
  templateUrl: './top-navigation-presentation.component.html',
  styleUrls: ['./top-navigation-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavigationPresentationComponent {
  @Input() public isValid: boolean = false;
  @Input() public loggedInUser: IUserDTO = new UserDTO();
  @Input() public navLinks: INavigation[];

  public isMenuCollapsed = true;

  public trackByLink(index: number, item: INavigation): number {
    return Utils.trackByValue(index, item, 'id');
  }
}
