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
  template: `
  <app-side-navigation-presentation
    [navLinks]="(navLinks)"
  ></app-side-navigation-presentation>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationSmartComponent {
  public navLinks: INavigation[] = navLinkList;
}
