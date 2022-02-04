import { AgencyDTO, IAgencyDTO } from './agency';
import { IRoleDTO, RoleDTO } from './role';

export interface IUserDTO {
  id: number;
  email: string;
  activatedAt: string | null;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  agency: IAgencyDTO;
  role: IRoleDTO;
  newEmail: string | null;
}

export class UserDTO implements IUserDTO {
  id: number = 0;
  email: string = '';
  activatedAt: string | null = null;
  firstName: string = '';
  lastName: string = '';
  profilePicture: string | null = null;
  agency: IAgencyDTO = new AgencyDTO();
  role: IRoleDTO = new RoleDTO();
  newEmail: string = '';

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

export interface IChangeEmailRequest {
  email: string;
}

export class ChangeEmailRequest implements IChangeEmailRequest {
  email: string = '';

  constructor(configOverride?: IChangeEmailRequest) {
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
  agency: IAgencyDTO;
  role: IRoleDTO;
}

export class ChangeUserRequest implements IChangeUserRequest {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  profilePicture: string = '';
  agency: IAgencyDTO = new AgencyDTO();
  role: IRoleDTO = new RoleDTO();

  constructor(configOverride?: IChangeUserRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IConfirmChangeEmailRequest {
  verificationCode: number;
}

export class ConfirmChangeEmailRequest implements IConfirmChangeEmailRequest {
  verificationCode: number = 0;

  constructor(configOverride?: IConfirmChangeEmailRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IUpdateUserProfile {
  firstName: string;
  lastName: string;
}

export class UpdateUserProfile implements IUpdateUserProfile {
  firstName: string = '';
  lastName: string = '';

  constructor(configOverride?: IUpdateUserProfile) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}