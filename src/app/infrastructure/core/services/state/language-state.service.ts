import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TranslocoService } from '@ngneat/transloco';

import { ILanguageTranslationKey } from '@models/translation/navigation';
import { ITranslation } from '@models/translation/translation';
import jsonFiles from '@assets/i18n/index';
import { LANGUAGE } from '@models/enums';
import { Logger } from '@utils/logger';
import { translocoConfigObj } from '@app/transloco/transloco-config';

@Injectable({
  providedIn: 'root',
})
export class LanguageStateService {
  constructor(private translocoService: TranslocoService) {}

  private defaultLanguage: string = translocoConfigObj.defaultLang;

  public activeLanguage$ = new BehaviorSubject<string>(
    this.getActiveLanguageFromCode(),
  );

  public activeLangIsDefaultLang$ = new BehaviorSubject<boolean>(
    this.checkActiveLangIsDefaultLang(),
  );

  public availableLanguagesForSelection$ = new BehaviorSubject<string[]>(
    this.getAvailableLanguagesForSelection(),
  );

  public dynamicLanguageForTranslation$ = new BehaviorSubject<string>(
    this.defaultLanguage,
  );

  public getActiveLanguage(): Observable<string> {
    return this.activeLanguage$.asObservable();
  }

  public getActiveLangIsDefaultLang(): Observable<boolean> {
    return this.activeLangIsDefaultLang$.asObservable();
  }

  public getAvailableLanguages(): Observable<string[]> {
    return this.availableLanguagesForSelection$.asObservable();
  }

  public getDynamicLanguageForTranslation(): Observable<string> {
    return this.dynamicLanguageForTranslation$.asObservable();
  }

  public getLanguageCodeFromLanguage(language: string): string {
    const languageCode = Object.keys(LANGUAGE).find(
      (key) => LANGUAGE[key]?.toLowerCase() === language?.toLowerCase().trim(),
    );
    if (!languageCode) {
      Logger.warn(
        `${language} is not a supported language, falling back to ${translocoConfigObj.defaultLang} for ${translocoConfigObj.defaultLangName}`,
      );
      return translocoConfigObj.defaultLang;
    }
    return languageCode;
  }

  public getTextInDefaultLang(property: string): string {
    return this.getPropValue(
      this.getLangJsonObj(this.defaultLanguage),
      property,
    );
  }

  public getTranslation(value: string): string {
    return this.translocoService.translate(
      value,
      {},
      this.translocoService.getActiveLang(),
    );
  }

  public resetDynamicLanguageForTranslation(): void {
    this.dynamicLanguageForTranslation$.next(this.defaultLanguage);
  }

  public selectLanguage(language: string): void {
    const languageName: string = this.getLanguageKeyFromJson(language);
    const languageCode: string = this.getLanguageCodeFromLanguage(languageName);

    this.setActiveLanguage(languageCode);
    this.setAvailableLanguagesForSelection();
    this.activeLangIsDefaultLang$.next(this.checkActiveLangIsDefaultLang());
  }

  public setActiveLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);

    this.updateBehaviorSubjects(languageCode);
  }

  public setDynamicLanguageForTranslation(languageCode: string): void {
    this.dynamicLanguageForTranslation$.next(languageCode);
  }

  public isAvailableLanguageCode(languageCode: string): boolean {
    return translocoConfigObj.availableLangs.includes(languageCode);
  }

  private checkActiveLangIsDefaultLang(): boolean {
    return this.translocoService.getActiveLang() === this.defaultLanguage;
  }

  private getActiveLanguageFromCode(): string {
    return this.getLanguageFromCode(this.translocoService.getActiveLang());
  }

  private getAvailableLanguagesForSelection(): string[] {
    return Object.values(LANGUAGE)
      .filter((language) => language !== this.getActiveLanguageFromCode())
      .sort();
  }

  private getLanguageFromCode(languageCode: string): string {
    return LANGUAGE[languageCode];
  }

  private getLanguageKeyFromJson(language: string): string {
    const languages: ILanguageTranslationKey = this.getLangJsonObj(
      this.translocoService.getActiveLang(),
    ).navigation.languages;

    const languageKey = Object.keys(languages).find((key) =>
      typeof languages[key] === 'string'
        ? key.toLowerCase() === language.trim().toLowerCase()
        : false,
    );

    if (!languageKey) {
      Logger.warn(
        `${language} is not a supported language, falling back to ${translocoConfigObj.defaultLangName}`,
      );
      return translocoConfigObj.defaultLangName;
    }

    return languageKey;
  }

  private getLangJsonObj(languageCode: string): ITranslation {
    return jsonFiles[languageCode.replace('-', '')].default;
  }

  private getPropValue(object, path: string = '') {
    return path
      .split('.')
      .reduce((o, x) => (o === undefined ? o : o[x]), object);
  }

  private setAvailableLanguagesForSelection(): void {
    this.availableLanguagesForSelection$.next(
      this.getAvailableLanguagesForSelection(),
    );
  }

  private updateBehaviorSubjects(languageCode: string): void {
    this.activeLanguage$.next(this.getLanguageFromCode(languageCode));
    this.availableLanguagesForSelection$.next(
      this.getAvailableLanguagesForSelection(),
    );
    this.activeLangIsDefaultLang$.next(this.checkActiveLangIsDefaultLang());
  }
}
