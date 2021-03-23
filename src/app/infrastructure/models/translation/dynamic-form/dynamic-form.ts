import { IDynamicFormAction, DynamicFormAction } from './action';
import { IDynamicFormError, DynamicFormError } from './error';
import { IDynamicFormLabel, DynamicFormLabel } from './label';
import { IDynamicFormPlaceholder, DynamicFormPlaceholder } from './placeholder';
import { IDynamicFormTitle, DynamicFormTitle } from './title';

export interface IDynamicFormTranslationType {
  action: IDynamicFormAction;
  error: IDynamicFormError;
  label: IDynamicFormLabel;
  placeholder: IDynamicFormPlaceholder;
  title: IDynamicFormTitle;
}

export class DynamicFormTranslationType implements IDynamicFormTranslationType {
  action: IDynamicFormAction = new DynamicFormAction();
  error: IDynamicFormError = new DynamicFormError();
  label: IDynamicFormLabel = new DynamicFormLabel();
  placeholder: IDynamicFormPlaceholder = new DynamicFormPlaceholder();
  title: IDynamicFormTitle = new DynamicFormTitle();
}
