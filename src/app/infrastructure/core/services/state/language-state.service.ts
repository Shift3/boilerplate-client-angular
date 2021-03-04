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

  private defaultLanguage: string = translocoConfigObj.defaultLang;

  public activeLanguage$ = new BehaviorSubject<string>(
    this.getActiveLanguageFromCode(),
  );

  public availableLanguagesForSelection$ = new BehaviorSubject<string[]>(
    this.getAvailableLanguagesForSelection(),
  );

  public activeLangIsDefaultLang$ = new BehaviorSubject<boolean>(
    this.checkActiveLangIsDefaultLang(),
  );

  public getActiveLanguage(): Observable<string> {
    return this.activeLanguage$.asObservable();
  }

  public getAvailableLanguages(): Observable<string[]> {
    return this.availableLanguagesForSelection$.asObservable();
  }

  public setActiveLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
    this.activeLanguage$.next(this.getLanguageFromCode(languageCode));
  }

  public selectLanguage(language: string): void {
    const languageName: string = this.getLanguageJsonKey(language);
    const languageCode: string = this.getLanguageCodeFromLanguage(languageName);

    this.setActiveLanguage(languageCode);
    this.setAvailableLanguagesForSelection();
    this.activeLangIsDefaultLang$.next(this.checkActiveLangIsDefaultLang());
  }

  public getActiveLangIsDefaultLang(): Observable<boolean> {
    return this.activeLangIsDefaultLang$.asObservable();
  }

  public getDefaultLangText(propertyFromJson: string): string {
    console.log(
      this.translocoService.translate(
        propertyFromJson,
        {},
        this.defaultLanguage,
      ),
    );
    console.log(this.translocoService.getTranslation(this.defaultLanguage));

    debugger;
    return this.translocoService.getTranslation(this.defaultLanguage)[
      propertyFromJson
    ];
  }

  private getActiveLanguageFromCode(): string {
    return this.getLanguageFromCode(this.translocoService.getActiveLang());
  }

  private getLanguageFromCode(languageCode: string): string {
    return LANGUAGE[languageCode];
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

  private getLanguageJsonKey(language: string): string {
    // read the current lang JSON file to reversely find the key that language is a value of.
    const langCode: string = this.translocoService
      .getActiveLang()
      .replace('-', '');
    const langJsonObj = jsonFiles[langCode].default.languages;

    return Object.keys(langJsonObj).find((key) =>
      typeof langJsonObj[key] === 'string'
        ? langJsonObj[key].toLowerCase() === language.trim().toLowerCase()
        : false,
    );
  }

  private checkActiveLangIsDefaultLang(): boolean {
    return this.translocoService.getActiveLang() === this.defaultLanguage;
  }
}
