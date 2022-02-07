import { IUserDTO } from './user';

export interface ISignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class SignupRequest implements ISignupRequest {
  email: string = '';
  password: string = '';
  /* tslint:disable:variable-name */
  firstName: string = '';
  lastName: string = '';

  constructor(configOverride?: ISignupRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface ISignupDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
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
  token: string;
  user: IUserDTO;
}
