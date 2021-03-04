import { Injectable } from '@angular/core';

import { LanguageStateService } from '@core/services/state/language-state.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private languageStateService: LanguageStateService) {}

  public getObjectProperty(objProperty: string, label: string): string {
    return `${objProperty}.${this.camalize(label)}`;
  }

  public getActiveLangIsDefaultLang() {
    return this.languageStateService.getActiveLangIsDefaultLang();
  }

  private camalize(textToCamelize: string): string {
    return textToCamelize
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }

  public getDefaultLangText(property: string): string {
    return this.languageStateService.getDefaultLangText(property);
  }
}
