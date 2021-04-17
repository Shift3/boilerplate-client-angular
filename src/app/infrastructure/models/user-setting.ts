export interface IUserSettingDTO {
  userId: number;
  language: number;
}

export class UserSettingDTO implements IUserSettingDTO {
  userId: number = 0;
  language: number = 0;

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
  language: string = 'en-US';

  constructor(configOverride?: IChangeUserSettingRequest) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
