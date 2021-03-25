import { IConfirmationModalTranslationKey } from './confirmation-modal';
import { IDynamicFormTranslationKey } from './dynamic-form/dynamic-form';
import { IDynamicTableTranslationKey } from './dynamic-table';
import { INavigationTranslationKey } from './navigation';
import { INotFoundTranslationKey } from './not-found';
import { INotificationTranslationKey } from './notification';
import { IRoutingTranslationKey } from './routing';
import { ISignUp } from './sign-up';
import { LANGUAGE } from '../enums';
import { translocoConfigObj } from '@app/transloco/transloco-config';

export interface ITranslation {
  confirmationModal: IConfirmationModalTranslationKey;
  dynamicForm: IDynamicFormTranslationKey;
  dynamicTable: IDynamicTableTranslationKey;
  navigation: INavigationTranslationKey;
  notFound: INotFoundTranslationKey;
  notification: INotificationTranslationKey;
  routing: IRoutingTranslationKey;
  signUp: ISignUp;
}

export interface IHasTranslation {
  name: string;
  code: string;
  hasTranslation: boolean;
}

export class HasTranslation implements IHasTranslation {
  name: string = LANGUAGE[translocoConfigObj.defaultLang];
  code: string = translocoConfigObj.defaultLang;
  hasTranslation: boolean = false;
  constructor(configOverride?: Partial<IHasTranslation>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
