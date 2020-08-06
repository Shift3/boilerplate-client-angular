export interface INavigation {
  id: number;
  label: string;
  link: string;
  icon?: string;
}

export class Navigation implements INavigation {
  id: number;
  label: string;
  link: string;
  icon?: string;

  static buildNavLinkList(isAdmin: boolean, navLinks: INavigation[]): INavigation[] {
    if (isAdmin) {
      navLinks = [
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
          id: 3,
          label: 'Settings',
          link: '/admin/settings',
          icon: 'fa fa-cog',
        },
      ];
    } else {
      navLinks = [
        {
          id: 1,
          label: 'Directory',
          link: '/content',
          icon: 'fa fa-stethoscope',
        },
      ];
    }

    return navLinks;
  }

  constructor(configOverride?: INavigation) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export type NavType = 'side' | 'top';

export const profileLinkList: INavigation[] = [
  {
    id: 1,
    label: 'Profile',
    link: '/user/profile',
  },
  {
    id: 2,
    label: 'Change Password',
    link: '/user/change-password',
  },
];
