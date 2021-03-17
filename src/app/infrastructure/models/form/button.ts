export interface ISaveCancelButtonConfig {
  save: string;
  cancel: string;
}

export class SaveCancelButtonConfig implements ISaveCancelButtonConfig {
  save: string = 'save';
  cancel: string = 'cancel';

  constructor(configOverride?: Partial<ISaveCancelButtonConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
