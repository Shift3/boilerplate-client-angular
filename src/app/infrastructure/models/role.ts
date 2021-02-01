export type RoleType = 'Admin' | 'Editor' | 'User' | 'Super Administrator' | '';

export interface IRoleDTO {
  id: number;
  roleName: RoleType;
}

export class RoleDTO implements IRoleDTO {
  id: number = 0;
  roleName: RoleType = '';

  static isValidRoleType(role: RoleType): role is RoleType {
    return ['Admin', 'Editor', 'User', 'Super Administrator'].includes(role);
  }

  /**
   * Checks if the parameter matches the `Super Administrator`, `Admin`, or `Editor` roles.
   */
  static canEdit(role: RoleType): role is RoleType {
    return ['Admin', 'Editor', 'Super Administrator'].includes(role);
  }

  /**
   * Checks if the parameter matches the `Super Administrator` or `Admin` roles.
   */
  static isAdminRoleType(role: RoleType): role is RoleType {
    return ['Admin', 'Super Administrator'].includes(role);
  }

  /**
   * Checks if the parameter matches the `Super Administrator` role.
   */
  static isSuperAdminRoleType(role: RoleType): role is RoleType {
    return ['Super Administrator'].includes(role);
  }

  constructor(configOverride?: Partial<IRoleDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IRoleCheck {
  canEdit: boolean;
  isAdmin: boolean;
  isValid: boolean;
  isSuperAdmin: boolean;
}

export class RoleCheck implements IRoleCheck {
  canEdit: boolean = false;
  isAdmin: boolean = false;
  isValid: boolean = false;
  isSuperAdmin: boolean = false;

  constructor(configOverride?: Partial<IRoleCheck>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
