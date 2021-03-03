import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

import { translocoConfigObj } from '@app/transloco/transloco-config';

import { LANGUAGE } from '@models/enums';

import jsonFiles from '@assets/i18n/index';

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

  public activeLangIsDefaultLang$ = new BehaviorSubject<boolean>(
    this.checkActiveLangIsDefaultLang(),
  );

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

  public selectLanguage(language: string): void {
    const languageName: string = this.getLanguageJsonKey(language),
      languageCode: string = this.getLanguageCodeFromLanguage(languageName);

    this.setActiveLanguage(languageCode);
    this.setAvailableLanguagesForSelection();
    this.activeLangIsDefaultLang$.next(this.checkActiveLangIsDefaultLang());
  }

  private getLanguageJsonKey(language: string): string {
    // read the current lang JSON file to reversely find the key that language is a value of.
    const langCode: string = this.translocoService
        .getActiveLang()
        .replace('-', ''),
      langJsonObj = jsonFiles[langCode].default['languages'];

    return Object.keys(langJsonObj).find((key) =>
      typeof langJsonObj[key] === 'string'
        ? langJsonObj[key].toLowerCase() === language.trim().toLowerCase()
        : false,
    );
  }

  private checkActiveLangIsDefaultLang(): boolean {
    return (
      this.translocoService.getActiveLang() === translocoConfigObj.defaultLang
    );
  }

  public getActiveLangIsDefaultLang(): Observable<boolean> {
    return this.activeLangIsDefaultLang$.asObservable();
  }
}
