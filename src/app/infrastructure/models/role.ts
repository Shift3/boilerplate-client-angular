import { ISelectOptions } from './form/select';

export type RoleType = 'Admin' | 'Editor' | 'User' | 'Super Administrator' | '';

export interface IRoleDTO {
  id: number;
  roleName: RoleType;
}

export class RoleDTO implements IRoleDTO {
  id: number = 0;
  roleName: RoleType = '';

  static isRoleType(role: RoleType): role is RoleType {
    return ['Admin', 'Editor', 'User', 'Super Administrator'].includes(role);
  }

  static isAdminRoleType(role: RoleType): role is RoleType {
    return ['Admin', 'Super Administrator'].includes(role);
  }

  constructor(configOverride?: IRoleDTO) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export const roleList: ISelectOptions<RoleType>[] = [
  {
    value: 1,
    name: 'Admin',
  },
  {
    value: 2,
    name: 'Editor',
  },
  {
    value: 3,
    name: 'Super Administrator',
  },
  {
    value: 4,
    name: 'User',
  },
];
