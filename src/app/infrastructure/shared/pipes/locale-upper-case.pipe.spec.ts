import { TestBed } from '@angular/core/testing';

import { TranslocoService, TranslocoTestingModule } from '@ngneat/transloco';

import { environment } from '@env/environment.test';
import { LocaleUpperCasePipe } from './locale-upper-case.pipe';
import { Logger } from '@utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] LocaleUpperCasePipe', () => {
      let service: TranslocoService;
      let pipe: LocaleUpperCasePipe;
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [TranslocoTestingModule],
          providers: [TranslocoService],
        });
        service = TestBed.inject(TranslocoService);
        pipe = new LocaleUpperCasePipe(service);
      });

      it('should be created', () => {
        expect(pipe).toBeTruthy();
      });

      it('should return an empty string when given an empty string', () => {
        const testValue = '';
        const expectedValue = '';
        spyOn(service, 'getActiveLang').and.returnValue('en');
        expect(pipe.transform(testValue)).toEqual(expectedValue);
      });

      it('should return should return uppercase when not passed a language value', () => {
        const testValue = 'test';
        const expectedValue = 'TEST';

        expect(pipe.transform(testValue)).toEqual(expectedValue);
      });

      it('should uppercase when there is a new value', () => {
        const testValue = 'test';
        const testValue2 = 'foo';
        const expectedValue = 'TEST';
        const expectedValue2 = 'FOO';
        expect(pipe.transform(testValue)).toEqual(expectedValue);
        expect(pipe.transform(testValue2)).toEqual(expectedValue2);
      });

      it('should map null to null', () => {
        expect(pipe.transform(null)).toEqual(null);
      });

      it('should map undefined to null', () => {
        expect(pipe.transform(undefined)).toEqual(null);
      });

      it('should should use the passed in parameter locale', () => {
        const locale = 'tr-TR';
        const testValue1 = 'ı';
        const expectedValue1 = 'I';
        const testValue2 = 'i';
        const expectedValue2 = 'İ';

        expect(pipe.transform(testValue1, locale)).toEqual(expectedValue1);
        expect(pipe.transform(testValue2, locale)).toEqual(expectedValue2);
      });

      it('should should prefer the passed in parameter locale to the active language', () => {
        const locale = 'tr-TR';
        const testValue1 = 'ı';
        const expectedValue1 = 'I';
        const testValue2 = 'i';
        const expectedValue2 = 'İ';
        spyOn(service, 'getActiveLang').and.returnValue('vi-VN');

        expect(pipe.transform(testValue1, locale)).toEqual(expectedValue1);
        expect(pipe.transform(testValue2, locale)).toEqual(expectedValue2);
      });

      it('should should use the active language when not passed a parameter', () => {
        const testValue = 'i';
        const expectedValue = 'I';
        spyOn(service, 'getActiveLang').and.returnValue('vi-VN');

        expect(pipe.transform(testValue)).toEqual(expectedValue);
      });

      it('should log a warning when given an invalid locale', () => {
        const testValue = 'test';
        const locale = '123';
        const spy = spyOn(Logger, 'warn');
        pipe.transform(testValue, locale);

        expect(spy).toHaveBeenCalled();
      });
    });