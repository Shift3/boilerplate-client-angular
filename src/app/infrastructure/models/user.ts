import { IRoleDTO, RoleDTO } from './role';

export interface IUserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: IRoleDTO;
}

export class UserDTO implements IUserDTO  {
  id: number = 0;
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  profilePicture: string = null;
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

export interface ICreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  roleId: number;
}

export class CreateUserRequest implements ICreateUserRequest {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  profilePicture: string = '';
  roleId: number = 0;

  constructor(configOverride?: ICreateUserRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
