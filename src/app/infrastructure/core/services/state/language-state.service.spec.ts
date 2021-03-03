import { TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@env/environment.test';
import { LanguageStateService } from './language-state.service';
import { Logger } from '@utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] LanguageStateService', () => {
      let service: LanguageStateService;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [TranslocoTestingModule],
          providers: [LanguageStateService],
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

      describe('setActiveLanguage()', () => {
        it('should set the active language', () => {
          const mockLang = 'es-ES';
          const expectedValue = 'spanish';

          service.setActiveLanguage(mockLang);
          expect(service.activeLanguage$.getValue()).toEqual(expectedValue);
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
      });

      describe('selectLanguage()', () => {
        // TODO: Test with a language that isn't listed in the LANGUAGE enum
        // TODO: Should be able to test if this calls translocoService correctly with the right values
        it('should set the active language', () => {
          const mockCurrentActiveLang = 'en-US';
          service.setActiveLanguage(mockCurrentActiveLang);

          const mockNewLang = 'spanish';
          const expectedValue = 'spanish';

          service.selectLanguage(mockNewLang);
          expect(service.activeLanguage$.getValue()).toEqual(expectedValue);
        });
      });

      describe('getActiveLangIsDefaultLang()', () => {
        // TODO: (pratima) revisit to fix this test
        // it('should return true as an Observable', () => {
        //   const mockCurrentActiveLang = 'en-US';
        //   service.setActiveLanguage(mockCurrentActiveLang);

        //   const testActiveLang$ = new BehaviorSubject<boolean>(true);
        //   const expectedValue = testActiveLang$.asObservable();

        //   expect(service.getActiveLangIsDefaultLang()).toEqual(expectedValue);
        // });

        it('should return false as an Observable', () => {
          const mockCurrentActiveLang = 'es-ES';
          service.setActiveLanguage(mockCurrentActiveLang);

          const testActiveLang$ = new BehaviorSubject<boolean>(false);
          const expectedValue = testActiveLang$.asObservable();

          expect(service.getActiveLangIsDefaultLang()).toEqual(expectedValue);
        });
      });
    });
