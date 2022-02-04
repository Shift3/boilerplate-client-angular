export interface ISaveCancelButtonConfig {
  save: string;
  cancel: string;
  showCancel?: boolean;
}

export class SaveCancelButtonConfig implements ISaveCancelButtonConfig {
  save: string = 'Save';
  cancel: string = 'Cancel';
  showCancel: boolean = true;

  constructor(configOverride?: Partial<ISaveCancelButtonConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
