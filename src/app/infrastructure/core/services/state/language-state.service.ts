import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TranslocoService } from '@ngneat/transloco';

import { LANGUAGE } from '@models/enums';

@Injectable({
  providedIn: 'root',
})
export class LanguageStateService {
  constructor(private translocoService: TranslocoService) {}

  public activeLanguage$ = new BehaviorSubject<string>(
    this.getActiveLanguageFromCode(),
  );

  public availableLanguagesForSelection$ = new BehaviorSubject<string[]>(
    this.getAvailableLanguagesForSelection(),
  );

  public getActiveLanguage(): Observable<string> {
    return this.activeLanguage$.asObservable();
  }

  public getAvailableLanguages(): Observable<string[]> {
    return this.availableLanguagesForSelection$.asObservable();
  }

  public selectLanguage(language: string): void {
    const languageCode: string = this.getLanguageCodeFromLanguage(language);
    this.setActiveLanguage(languageCode);
    this.setAvailableLanguagesForSelection();
  }

  private getActiveLanguageFromCode(): string {
    return this.getLanguageFromCode(this.translocoService.getActiveLang());
  }

  private getLanguageFromCode(languageCode: string): string {
    return LANGUAGE[languageCode];
  }

  private setActiveLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
    this.activeLanguage$.next(this.getLanguageFromCode(languageCode));
  }

  private getAvailableLanguagesForSelection(): string[] {
    return Object.values(LANGUAGE)
      .filter((language) => language !== this.getActiveLanguageFromCode())
      .sort();
  }

  private setAvailableLanguagesForSelection(): void {
    this.availableLanguagesForSelection$.next(
      this.getAvailableLanguagesForSelection(),
    );
  }

  private getLanguageCodeFromLanguage(language: string): string {
    return Object.keys(LANGUAGE).find(
      (key) => LANGUAGE[key].toLowerCase() === language.toLowerCase().trim(),
    );
  }
}
