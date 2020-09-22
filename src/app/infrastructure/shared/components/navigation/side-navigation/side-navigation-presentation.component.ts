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

@Component({
  selector: 'app-side-navigation-presentation',
  templateUrl: './side-navigation-presentation.component.html',
  styleUrls: ['./side-navigation-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationPresentationComponent {
  @Input() public isValid: boolean = false;
  @Input() public loggedInUser: IUserDTO = new UserDTO();
  @Input() public navLinks: INavigation[];

  public isMenuCollapsed = true;

  public trackByLink(index: number, item: INavigation): number {
    return (item) ? item.id : null;
  }
}
