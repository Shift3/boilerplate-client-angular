import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { INavigation } from '@models/navigation';

@Component({
  selector: 'app-side-navigation-presentation',
  templateUrl: './side-navigation-presentation.component.html',
  styleUrls: ['./side-navigation-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationPresentationComponent {
  @Input() public isLoggedInUser: boolean = false;
  @Input() public navLinks: INavigation[];

  public isMenuCollapsed = true;

  public trackByLink(index: number, item: INavigation): number {
    return (item) ? item.id : null;
  }
}
