import { TestBed } from '@angular/core/testing';
import { TranslocoTestingModule, TranslocoService } from '@ngneat/transloco';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@env/environment.test';
import {
  INavigationTranslationKey,
  NavigationTranslationKey,
} from '@models/translation/navigation';
import { LanguageStateService } from './language-state.service';
import { Logger } from '@utils/logger';
import { translocoConfigObj } from '@app/transloco/transloco-config';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] LanguageStateService', () => {
      let service: LanguageStateService;
      const translocoServiceMock = {
        getActiveLang: jasmine.createSpy('getActiveLang'),
        setActiveLang: jasmine.createSpy('setActiveLang'),
        translate: jasmine.createSpy('translate'),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [TranslocoTestingModule],
          providers: [
            LanguageStateService,
            { provide: TranslocoService, useValue: translocoServiceMock },
          ],
        });
        service = TestBed.inject(LanguageStateService);
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      describe('getActiveLanguage()', () => {
        // TODO: Test null or undefined to test failure
        it('should return as an Observable', () => {
          const mockActiveLang$ = new BehaviorSubject<string>('english');
          const testActiveLang$ = new BehaviorSubject<string>('english');
          const expectedValue = testActiveLang$.asObservable();

          service.activeLanguage$ = mockActiveLang$;
          expect(service.getActiveLanguage()).toEqual(expectedValue);
        });
      });

      describe('getActiveLangIsDefaultLang()', () => {
        it('should return as an Observable', () => {
          const mockCurrentActiveLang = 'es-MX';
          service.setActiveLanguage(mockCurrentActiveLang);

          const testActiveLang$ = new BehaviorSubject<boolean>(false);
          const expectedValue = testActiveLang$.asObservable();

          expect(service.getActiveLangIsDefaultLang()).toEqual(expectedValue);
        });
      });

      describe('getAvailableLanguages()', () => {
        // TODO: Test empty array for failure
        it('should return as an Observable', () => {
          const mockAvailableLangs$ = new BehaviorSubject<string[]>([
            'english',
            'spanish',
          ]);
          const testAvailableLangs$ = new BehaviorSubject<string[]>([
            'english',
            'spanish',
          ]);
          const expectedValue = testAvailableLangs$.asObservable();

          service.availableLanguagesForSelection$ = mockAvailableLangs$;
          expect(service.getAvailableLanguages()).toEqual(expectedValue);
        });

        it('should return a empty array as an Observable', () => {
          const mockAvailableLangs$ = new BehaviorSubject<string[]>([]);
          const testAvailableLangs$ = new BehaviorSubject<string[]>([]);
          const expectedValue = testAvailableLangs$.asObservable();

          service.availableLanguagesForSelection$ = mockAvailableLangs$;
          expect(service.getAvailableLanguages()).toEqual(expectedValue);
        });
      });

      describe('getDynamicLanguageForTranslation()', () => {
        it('should return as an Observable', () => {
          const mockLang$ = new BehaviorSubject<string>('en-US');
          const testLang$ = new BehaviorSubject<string>('en-US');
          const expectedValue = testLang$.asObservable();

          service.dynamicLanguageForTranslation$ = mockLang$;
          expect(service.getDynamicLanguageForTranslation()).toEqual(
            expectedValue,
          );
        });
      });

      describe('getLanguageCodeFromLanguage()', () => {
        it('should return undefined for any language that is not supported by the application', () => {
          const language: string = 'Russian';
          const expectedValue = undefined;

          expect(service.getLanguageCodeFromLanguage(language)).toEqual(
            expectedValue,
          );
        });

        it('should return the language code of the language', () => {
          const language: string = 'English';
          const expectedValue = 'en-US';

          expect(service.getLanguageCodeFromLanguage(language)).toEqual(
            expectedValue,
          );
        });
      });

      describe('getTextInDefaultLang()', () => {
        it(`should return undefined if property doesn't exist in the default language JSON file`, () => {
          const mockProperty = 'navigation.userProfile.name';
          const expectedValue = undefined;

          expect(service.getTextInDefaultLang(mockProperty)).toEqual(
            expectedValue,
          );
        });

        it('should return the text in default language', () => {
          const navigationTranslationKeys: INavigationTranslationKey = new NavigationTranslationKey();
          const mockProperty = navigationTranslationKeys.userProfile.signOut;
          const expectedValue = 'Sign Out';

          expect(service.getTextInDefaultLang(mockProperty)).toEqual(
            expectedValue,
          );
        });
      });

      describe('getTranslation()', () => {
        xit('should call translocoService.translate with value param', () => {
          const testValue = 'test';
          const testActiveLang = 'en-US';
          translocoServiceMock.getActiveLang.and.returnValue(testActiveLang);
          service.getTranslation(testValue);
          expect(translocoServiceMock.translate).toHaveBeenCalledWith(
            testValue,
            {},
            testActiveLang,
          );
        });
      });

      describe('resetDynamicLanguageForTranslation()', () => {
        it('should reset the language for dynamic translation', () => {
          const testLang$ = new BehaviorSubject<string>('es-MX');

          service.dynamicLanguageForTranslation$ = testLang$;
          service.resetDynamicLanguageForTranslation();
          expect(service.dynamicLanguageForTranslation$.getValue()).toEqual(
            translocoConfigObj.defaultLang,
          );
        });
      });

      describe('selectLanguage()', () => {
        // TODO: Test with a language that isn't listed in the LANGUAGE enum
        // TODO: Should be able to test if this calls translocoService correctly with the right values
        it('should set the active language', () => {
          const mockNewLang = 'spanish';
          const expectedValue = 'spanish';
          translocoServiceMock.getActiveLang.and.returnValue('es-MX');
          service.selectLanguage(mockNewLang);
          expect(service.activeLanguage$.getValue()).toEqual(expectedValue);
        });

        it('should set the activeLangIsDefaultLang stream to false when the active language is not the default language', () => {
          const mockNewLang = 'spanish';
          const expectedValue = false;
          translocoServiceMock.getActiveLang.and.returnValue('es-MX');
          service.selectLanguage(mockNewLang);
          expect(service.activeLangIsDefaultLang$.getValue()).toEqual(
            expectedValue,
          );
        });

        it('should set the activeLangIsDefaultLang stream to true when the active language is the default language', () => {
          const mockNewLang = 'english';
          const expectedValue = true;
          translocoServiceMock.getActiveLang.and.returnValue('en-US');
          service.selectLanguage(mockNewLang);
          expect(service.activeLangIsDefaultLang$.getValue()).toEqual(
            expectedValue,
          );
        });
      });

      describe('setActiveLanguage()', () => {
        it('should set the active language', () => {
          const mockLang = 'es-MX';
          const expectedValue = 'spanish';

          service.setActiveLanguage(mockLang);
          expect(service.activeLanguage$.getValue()).toEqual(expectedValue);
        });
      });

      describe('setDynamicLanguageForTranslation()', () => {
        it('should set the language for dynamic translation', () => {
          const testLang = 'es-MX';
          const expectedValue = 'es-MX';

          service.setDynamicLanguageForTranslation(testLang);
          expect(service.dynamicLanguageForTranslation$.getValue()).toEqual(
            expectedValue,
          );
        });
      });

      describe('isAvailableLanguageCode()', () => {
        it('should return true when the language code parameter is in the list', () => {
          const testLang = 'es-MX';
          const expectedValue = true;

          expect(service.isAvailableLanguageCode(testLang)).toEqual(
            expectedValue,
          );
        });

        it('should return false when the language code parameter is not in the list', () => {
          const testLang = 'en-GB';
          const expectedValue = false;

          expect(service.isAvailableLanguageCode(testLang)).toEqual(
            expectedValue,
          );
        });

        it('should return false when the language code parameter is null', () => {
          const expectedValue = false;

          expect(service.isAvailableLanguageCode(null)).toEqual(expectedValue);
        });

        it('should return false when the language code parameter is undefined', () => {
          const expectedValue = false;

          expect(service.isAvailableLanguageCode(undefined)).toEqual(
            expectedValue,
          );
        });
      });
    });
