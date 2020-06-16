import { Component, ChangeDetectionStrategy } from '@angular/core';
import { INavigation } from '@models/navigation';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavigationComponent {
  public isMenuCollapsed = true;
  public navLinks: INavigation[] = [
    {
      id: 1,
      label: 'Directory',
      link: '/content',
      icon: 'fa fa-stethoscope',
    },
    {
      id: 2,
      label: 'Users',
      link: '/admin/user-list',
      icon: 'fa fa-users',
    },
    {
      id: 2,
      label: 'Settings',
      link: '/admin/settings',
      icon: 'fa fa-cog',
    },
  ];

  public trackByLink(index: number, item: INavigation): number {
    return (item) ? item.id : null;
  }
}
