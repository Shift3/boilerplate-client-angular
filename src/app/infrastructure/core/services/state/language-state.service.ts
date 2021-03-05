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
    const languageName: string = this.getLanguageKeyFromJson(language);
    const languageCode: string = this.getLanguageCodeFromLanguage(languageName);

    this.setActiveLanguage(languageCode);
    this.setAvailableLanguagesForSelection();
    this.activeLangIsDefaultLang$.next(this.checkActiveLangIsDefaultLang());
  }

  public getActiveLangIsDefaultLang(): Observable<boolean> {
    return this.activeLangIsDefaultLang$.asObservable();
  }

  public getTextInDefaultLang(
    mainProperty: string,
    nestedProperty: string,
  ): string {
    // TODO: (pratima) revisit to add logic for more than 1 level nested value
    return this.getLangJsonObj(this.defaultLanguage)[mainProperty][
      nestedProperty
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

  private getLanguageKeyFromJson(language: string): string {
    // read the current lang JSON file to reversely find the key that language is a value of.
    const objPropertyWanted: string = 'languages';
    const languages = this.getLangJsonObj(
      this.translocoService.getActiveLang(),
    )[objPropertyWanted];

    return Object.keys(languages).find((key) =>
      typeof languages[key] === 'string'
        ? languages[key].toLowerCase() === language.trim().toLowerCase()
        : false,
    );
  }

  private getLangJsonObj(languageCode: string): object {
    return jsonFiles[languageCode.replace('-', '')].default;
  }

  private checkActiveLangIsDefaultLang(): boolean {
    return this.translocoService.getActiveLang() === this.defaultLanguage;
  }
}
