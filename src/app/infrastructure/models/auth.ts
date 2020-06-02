import { IUserDTO } from './user';

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
