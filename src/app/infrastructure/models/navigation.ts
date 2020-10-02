import { IRoleCheck } from './role';

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

  static buildNavLinkList(roleList: IRoleCheck): INavigation[] {
    let navLinks: INavigation[] = [];
    if (roleList.isSuperAdmin) {
      return (navLinks = [
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
          label: 'Agencies',
          link: '/admin/agency-list',
          icon: 'fa fa-building',
        },
        // {
        //   id: 4,
        //   label: 'Settings',
        //   link: '/admin/settings',
        //   icon: 'fa fa-cog',
        // },
      ]);
    } else if (roleList.isAdmin) {
      return (navLinks = [
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
        // {
        //   id: 3,
        //   label: 'Settings',
        //   link: '/admin/settings',
        //   icon: 'fa fa-cog',
        // },
      ]);
    }

    return (navLinks = [
      {
        id: 1,
        label: 'Directory',
        link: '/content',
        icon: 'fa fa-stethoscope',
      },
    ]);
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
