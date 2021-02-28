import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  public getObjectProperty(objProperty: string, label: string): string {
    return `${objProperty}.${
      label.split(' ').length > 1 ? this.camalize(label) : label
    }`;
  }

  private camalize(textToCamelize: string): string {
    return textToCamelize
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }
}
