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
        it('should return as an Observable', () => {
          const mockActiveLang$ = new BehaviorSubject<string>('English');
          const testActiveLang$ = new BehaviorSubject<string>('English');
          const expectedValue = testActiveLang$.asObservable();

          service.activeLanguage$ = mockActiveLang$;
          expect(service.getActiveLanguage()).toEqual(expectedValue);
        });
      });

      describe('getAvailableLanguages()', () => {
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
        it('should set the active language', () => {
          const mockLang = 'Spanish';
          const expectedValue = 'Spanish';

          service.selectLanguage(mockLang);
          expect(service.activeLanguage$.getValue()).toEqual(expectedValue);
        });
      });
    });
