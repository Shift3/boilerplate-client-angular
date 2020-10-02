import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { ErrorService } from './error.service';
import { Logger } from '@utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] ErrorService', () => {
      let service: ErrorService;

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [ErrorService],
        });
        service = TestBed.inject(ErrorService);
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      describe('getClientMessage()', () => {
        it(`should return the passed in error message in a list`, () => {
          const error = new Error('Test');
          const expectedValue = ['Test'];

          expect(service.getClientMessage(error)).toEqual(expectedValue);
        });

        it(`should return 'No Internet Connection.' in a list when the client reports being offline`, () => {
          const error = new Error('Test');
          const expectedValue = ['No Internet Connection.'];
          spyOnProperty(navigator, 'onLine').and.returnValue(false);

          expect(service.getClientMessage(error)).toEqual(expectedValue);
        });
      });

      describe('getServerMessage()', () => {
        it(`should return the passed in error message in a list`, () => {
          const error = new Error('Test');
          const httpError = new HttpErrorResponse({ error });
          const expectedValue = ['Test'];

          expect(service.getServerMessage(httpError)).toEqual(expectedValue);
        });
      });
    });
