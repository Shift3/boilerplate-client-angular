export type RoleType = 'Admin' | 'Editor' | 'User' | 'Super Administrator' | '';

export interface IRoleDTO {
  id: number;
  roleName: string;
}

export class RoleDTO implements IRoleDTO {
  id: number = 0;
  roleName: string = '';

  static isRoleType(role: string): role is RoleType {
    return ['Admin', 'Editor', 'User', 'Super Administrator'].includes(role);
  }

  static isAdminRoleType(role: string): role is RoleType {
    return ['Admin', 'Super Administrator'].includes(role);
  }

  constructor(configOverride?: IRoleDTO) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
