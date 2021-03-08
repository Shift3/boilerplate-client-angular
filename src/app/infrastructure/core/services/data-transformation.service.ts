import { Injectable } from '@angular/core';

import { LanguageStateService } from '@core/services/state/language-state.service';

@Injectable({
  providedIn: 'root',
})
export class DataTransformationService {
  constructor(private languageStateService: LanguageStateService) {}

  public getObjectProperty(objProperty: string, label: string): string {
    if (!label || label.length === 0) return '';

    return `${objProperty}.${
      label.split(' ').length > 1 ? this.camelize(label) : label
    }`;
  }

  private camelize(textToCamelize: string): string {
    return textToCamelize
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }

  public concatenateObjValues(object: any): string {
    return Object.keys(object).reduce((prev, curr) => {
      const currValue = object[curr];
      const capitalizedValue =
        currValue.charAt(0).toUpperCase() + currValue.substr(1);
      return `${prev} ${capitalizedValue}`;
    }, '');
  }

  public getTextInDefaultLang(property: string): string {
    return this.languageStateService.getTextInDefaultLang(property);
  }
}
