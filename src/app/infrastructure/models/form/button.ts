import {
  IDynamicForm,
  DynamicForm,
} from '@models/translation/dynamic-form/dynamic-form';

const dynamicForm: IDynamicForm = new DynamicForm();

export interface ISaveCancelButtonConfig {
  save: string;
  cancel: string;
}

export class SaveCancelButtonConfig implements ISaveCancelButtonConfig {
  save: string = dynamicForm.action.submit;
  cancel: string = dynamicForm.action.cancel;

  constructor(configOverride?: Partial<ISaveCancelButtonConfig>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
