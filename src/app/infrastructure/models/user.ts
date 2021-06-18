import { translocoConfigObj } from '@app/transloco/transloco-config';
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
  settings: IUserSettingDTO;
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
  settings: IUserSettingDTO = new UserSettingDTO();

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

export interface ILanguage {
  currency: string;
  dateFormat: string;
  language: string;
  languageCode: string;
}

export class Language implements ILanguage {
  currency: string = 'dollar';
  dateFormat: string = 'mm/dd/yyyy';
  language: string = 'English';
  languageCode: string = 'en-US';

  constructor(configOverride?: Partial<ILanguage>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IUserSettingDTO {
  language: ILanguage;
}

export class UserSettingDTO implements IUserSettingDTO {
  language: ILanguage = new Language();

  constructor(configOverride?: Partial<IUserSettingDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IChangeUserSettingRequest {
  language: string;
}

export class ChangeUserSettingRequest implements IChangeUserSettingRequest {
  language: string = translocoConfigObj.defaultLang;

  constructor(configOverride?: IChangeUserSettingRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
