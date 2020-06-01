export interface ILoginRequest {
  email: string;
  password: string;
}

export class LoginRequest implements ILoginRequest {
  email: string;
  password: string;

  constructor(configOverride?: Partial<ILoginRequest>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface ISessionDTO {
  token: string;
}
