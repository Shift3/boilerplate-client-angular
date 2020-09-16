import { AgencyDTO, IAgencyDTO } from './agency';
import { IRoleDTO, RoleDTO } from './role';

export interface IUserDTO {
  id: number;
  email: string;
  activatedAt: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  agency: IAgencyDTO;
  role: IRoleDTO;
}

export class UserDTO implements IUserDTO {
  id: number = 0;
  email: string = '';
  activatedAt: string = null;
  firstName: string = '';
  lastName: string = '';
  profilePicture: string = null;
  agency: IAgencyDTO = new AgencyDTO();
  role: IRoleDTO = new RoleDTO();

  constructor(configOverride?: Partial<IUserDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IForgotPasswordRequest {
  email: string;
}

export class ForgotPasswordRequest implements IForgotPasswordRequest {
  email: string = '';

  constructor(configOverride?: IForgotPasswordRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IResetPasswordRequest {
  newPassword: string;
  confirmPassword: string;
}

export class ResetPasswordRequest implements IResetPasswordRequest {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(configOverride?: IResetPasswordRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export class ChangePasswordRequest implements IChangePasswordRequest {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(configOverride?: IChangePasswordRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IChangeUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: IRoleDTO;
}

export class ChangeUserRequest implements IChangeUserRequest {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  profilePicture: string = '';
  role: IRoleDTO = new RoleDTO();

  constructor(configOverride?: IChangeUserRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
