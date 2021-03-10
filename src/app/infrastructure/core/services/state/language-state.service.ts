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

  public activeLangIsDefaultLang$ = new BehaviorSubject<boolean>(
    this.checkActiveLangIsDefaultLang(),
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

  public getActiveLangIsDefaultLang(): Observable<boolean> {
    return this.activeLangIsDefaultLang$.asObservable();
  }

  public getTextInDefaultLang(property: string): string {
    return this.getPropValue(
      this.getLangJsonObj(this.defaultLanguage),
      property,
    );
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
    this.activeLanguage$.next(this.getLanguageFromCode(languageCode));
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

  private getLanguageCodeFromLanguage(language: string): string {
    return Object.keys(LANGUAGE).find(
      (key) => LANGUAGE[key].toLowerCase() === language.toLowerCase().trim(),
    );
  }

  private getLanguageFromCode(languageCode: string): string {
    return LANGUAGE[languageCode];
  }

  private getLanguageKeyFromJson(language: string): string {
    const navigationLanguageList: string = 'navigation.languages';
    const languages = this.getPropValue(
      this.getLangJsonObj(this.translocoService.getActiveLang()),
      navigationLanguageList,
    );

    return Object.keys(languages).find((key) =>
      typeof languages[key] === 'string'
        ? key.toLowerCase() === language.trim().toLowerCase()
        : false,
    );
  }

  private getLangJsonObj(languageCode: string): object {
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
}
