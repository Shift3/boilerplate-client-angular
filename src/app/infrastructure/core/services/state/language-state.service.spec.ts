import { TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { LanguageStateService } from './language-state.service';
import { TranslocoService, TranslocoTestingModule } from '@ngneat/transloco';

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
          const mockActiveLang$ = new BehaviorSubject<string>('English');
          const testActiveLang$ = new BehaviorSubject<string>('English');
          const expectedValue = testActiveLang$.asObservable();

          service.activeLanguage$ = mockActiveLang$;
          expect(service.getActiveLanguage()).toEqual(expectedValue);
        });
      });

      describe('getAvailableLanguages()', () => {
        // TODO: Test empty array for failure
        it('should return as an Observable', () => {
          const mockAvailableLangs$ = new BehaviorSubject<string[]>([
            'English',
            'Spanish',
          ]);
          const testAvailableLangs$ = new BehaviorSubject<string[]>([
            'English',
            'Spanish',
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
          const mockLang = 'Spanish';
          const expectedValue = 'Spanish';

          service.selectLanguage(mockLang);
          expect(service.activeLanguage$.getValue()).toEqual(expectedValue);
        });
      });
    });
