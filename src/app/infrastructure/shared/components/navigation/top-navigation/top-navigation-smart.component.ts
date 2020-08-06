import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { INavigation, navLinkList } from '@models/navigation';

@Component({
  selector: 'app-top-navigation',
  template: `
      <app-top-navigation-presentation
        [navLinks]="(navLinks)"
      ></app-top-navigation-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavigationSmartComponent {
  public navLinks: INavigation[] = navLinkList;
}
