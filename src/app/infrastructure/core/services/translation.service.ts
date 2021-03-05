import { Injectable } from '@angular/core';

import { LanguageStateService } from '@core/services/state/language-state.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private languageStateService: LanguageStateService) {}

  public getObjectProperty(objProperty: string, label: string): string {
    if (!label || label.length === 0) return '';

    return `${objProperty}.${this.camelize(label)}`;
  }

  public getActiveLangIsDefaultLang() {
    return this.languageStateService.getActiveLangIsDefaultLang();
  }

  private camelize(textToCamelize: string): string {
    return textToCamelize
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }

  public getTextInDefaultLang(
    mainProperty: string,
    nestedProperty: string,
  ): string {
    return this.languageStateService.getTextInDefaultLang(
      mainProperty,
      nestedProperty,
    );
  }
}
