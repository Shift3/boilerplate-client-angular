export interface ISentryConfig {
  sendToSentry: boolean;
  showDialog: boolean;
}

export class SentryConfig implements ISentryConfig {
  sendToSentry: boolean;
  showDialog: boolean;

  constructor() {
    this.sendToSentry = false;
    this.showDialog = false;
  }
}
