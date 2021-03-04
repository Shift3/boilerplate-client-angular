import { environment } from '@env/environment';
import { LANGUAGE } from '@models/enums';

export const translocoConfigObj = {
  availableLangs: Object.keys(LANGUAGE),
  defaultLang: 'en-US',
  fallbackLang: 'en-US', // Dictates what language to use if you don’t have any particular translation label
  flatten: {
    aot: environment.production,
  },
  keysManager: {},
  prodMode: environment.production,
  reRenderOnLangChange: true, // Remove this option if your application doesn't support changing language in runtime.
  rootTranslationsPath: 'src/assets/i18n',
};
