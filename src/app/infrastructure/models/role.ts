import { ISelectOptions } from './form/select';

export type RoleType = 'Admin' | 'Editor' | 'User' | 'Super Administrator' | '';

export interface IRoleDTO {
  id: number;
  roleName: RoleType;
}

export class RoleDTO implements IRoleDTO {
  id: number = 0;
  roleName: RoleType = '';

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
    name: 'User',
  },
  {
    value: 4,
    name: 'Super Administrator',
  },
];
