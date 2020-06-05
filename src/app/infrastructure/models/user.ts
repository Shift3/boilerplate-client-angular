export interface IUserDTO {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
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

export interface IForgotPasswordDTO {
  message: string;
}

export interface IResetPasswordRequest {
  password: string;
  confirmPassword: string;
}

export class ResetPasswordRequest implements IResetPasswordRequest {
  password: string = '';
  confirmPassword: string = '';

  constructor(configOverride?: IResetPasswordRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
