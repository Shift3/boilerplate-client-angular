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

export interface IResetPasswordRequest {
  /* tslint:disable:variable-name */
  new_password: string;
  confirm_password: string;
}

export class ResetPasswordRequest implements IResetPasswordRequest {
  new_password: string = '';
  confirm_password: string = '';

  constructor(configOverride?: IResetPasswordRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
