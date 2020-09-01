export interface IConfirmModalConfig {
  id?: number;
  message: string;
  action: string;
}

export class ConfirmModalConfig implements IConfirmModalConfig {
  id?: number = 0;
  message: string = 'Confirm';
  action: string = 'Confirm';

  constructor(configOverride?: Partial<IConfirmModalConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export type IConfirmModalCallback<T> = (value: T) => void;
