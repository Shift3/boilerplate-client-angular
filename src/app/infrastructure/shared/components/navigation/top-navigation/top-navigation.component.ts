import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  INavigation,
  navLinkList,
} from '@models/navigation';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavigationComponent {
  public isMenuCollapsed = true;
  public navLinks: INavigation[] = navLinkList;

  public trackByLink(index: number, item: INavigation): number {
    return (item) ? item.id : null;
  }
}
