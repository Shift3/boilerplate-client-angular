import {
  IDynamicFormTranslationType,
  DynamicFormTranslationType,
} from '@models/translation/dynamic-form/dynamic-form';

const dynamicFormTranslationKeys: IDynamicFormTranslationType = new DynamicFormTranslationType();

export interface ISaveCancelButtonConfig {
  save: string;
  cancel: string;
}

export class SaveCancelButtonConfig implements ISaveCancelButtonConfig {
  save: string = dynamicFormTranslationKeys.action.submit;
  cancel: string = dynamicFormTranslationKeys.action.cancel;

  constructor(configOverride?: Partial<ISaveCancelButtonConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
