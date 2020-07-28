import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  INavigation,
  navLinkList,
} from '@models/navigation';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationComponent {
  public isMenuCollapsed = true;
  public navLinks: INavigation[] = navLinkList;

  public trackByLink(index: number, item: INavigation): number {
    return (item) ? item.id : null;
  }
}
