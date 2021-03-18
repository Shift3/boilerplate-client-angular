import { IMessage, Message } from './message';

export interface ISentryConfig {
  message: IMessage;
  sendToSentry: boolean;
  showDialog: boolean;
}

export class SentryConfig implements ISentryConfig {
  message: IMessage = new Message();
  sendToSentry: boolean = false;
  showDialog: boolean = false;

  constructor(configOverride?: Partial<ISentryConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
