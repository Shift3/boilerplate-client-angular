export interface IConfirmModalConfig {
  id?: number;
  message: IConfirmModalMessageConfig;
  action: string;
}

export interface IConfirmModalMessageConfig {
  static: string;
  dynamic?: string;
}

export class ConfirmModalMessageConfig implements IConfirmModalMessageConfig {
  static: string = 'Confirm';
  dynamic: string = '';

  constructor(configOverride?: Partial<IConfirmModalMessageConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export class ConfirmModalConfig implements IConfirmModalConfig {
  id?: number = 0;
  message: IConfirmModalMessageConfig = new ConfirmModalMessageConfig();
  action: string = 'Confirm';

  constructor(configOverride?: Partial<IConfirmModalConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
