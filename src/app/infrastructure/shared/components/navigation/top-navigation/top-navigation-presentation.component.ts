import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { INavigation } from '@models/navigation';

@Component({
  selector: 'app-top-navigation-presentation',
  templateUrl: './top-navigation-presentation.component.html',
  styleUrls: ['./top-navigation-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavigationPresentationComponent {
  @Input() public isAdmin: boolean = false;
  @Input() public isLoggedInUser: boolean = false;
  @Input() public navLinks: INavigation[];

  public isMenuCollapsed = true;

  public trackByLink(index: number, item: INavigation): number {
    return (item) ? item.id : null;
  }
}
