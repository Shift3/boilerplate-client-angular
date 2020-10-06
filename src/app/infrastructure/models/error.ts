export interface ISentryConfig {
  message: string;
  sendToSentry: boolean;
  showDialog: boolean;
}

export class SentryConfig implements ISentryConfig {
  message: string = '';
  sendToSentry: boolean = false;
  showDialog: boolean = false;

  constructor(configOverride?: Partial<ISentryConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
