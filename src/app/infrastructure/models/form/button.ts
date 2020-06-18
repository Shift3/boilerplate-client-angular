export interface ISaveCancelButtonConfig {
  save: string;
  cancel: string;
}

export class SaveCancelButtonConfig implements ISaveCancelButtonConfig {
  save: string = 'Save';
  cancel: string = 'Cancel';

  constructor(configOverride?: Partial<ISaveCancelButtonConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
