import { IUserDTO } from './user';

export interface ISignupRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export class SignupRequest implements ISignupRequest {
  email: string = '';
  password: string = '';
  /* tslint:disable:variable-name */
  first_name: string = '';
  last_name: string = '';

  constructor(configOverride?: ISignupRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface ISignupDTO {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export class LoginRequest implements ILoginRequest {
  email: string = '';
  password: string = '';

  constructor(configOverride?: ILoginRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface ISessionDTO {
  jwt_token: string;
  user: IUserDTO;
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
