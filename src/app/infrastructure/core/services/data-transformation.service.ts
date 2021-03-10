import { Injectable } from '@angular/core';

import { LanguageStateService } from '@core/services/state/language-state.service';

@Injectable({
  providedIn: 'root',
})
export class DataTransformationService {
  constructor(private languageStateService: LanguageStateService) {}

  public concatenateObjValues<T>(object: T): string {
    return Object.keys(object).reduce((prev, curr) => {
      const currValue = object[curr];
      const capitalizedValue =
        currValue.charAt(0).toUpperCase() + currValue.substr(1);

      return `${prev} ${capitalizedValue}`;
    }, '');
  }

  public getObjectProperty(objProperty: string, label: string): string {
    if (!label?.length) return '';

    return `${objProperty}.${
      label.split(' ').length > 1 ? this.camelize(label) : label.toLowerCase()
    }`;
  }

  public getTextInDefaultLang(property: string): string {
    return this.languageStateService.getTextInDefaultLang(property);
  }

  private camelize(textToCamelize: string): string {
    return textToCamelize
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }
}
