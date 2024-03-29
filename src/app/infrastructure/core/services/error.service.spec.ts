import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { ErrorService } from './error.service';
import { Logger } from '@utils/logger';
import { SentryConfig } from '@models/error';

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

      describe('setErrorStateWhenUnknown()', () => {
        it(`should return the initial config object unchanged when it is type Error`, () => {
          const error = new Error('Test');
          const sentryConfig = new SentryConfig();
          const expectedValue = new SentryConfig();

          expect(service.setErrorStateWhenUnknown(error, sentryConfig)).toEqual(
            expectedValue,
          );
        });

        it(`should return the populated config object when the HttpErrorResponse status code is 500`, () => {
          const error = new Error();
          const httpError = new HttpErrorResponse({ error, status: 500 });
          const sentryConfig = new SentryConfig();
          const expectedValue = new SentryConfig({
            message: 'Server Error',
            sendToSentry: true,
            showDialog: true,
          });

          expect(
            service.setErrorStateWhenUnknown(httpError, sentryConfig),
          ).toEqual(expectedValue);
        });

        it(`should return the populated config object when the HttpErrorResponse does not have a status code and it is online`, () => {
          const error = new Error();
          const httpError = new HttpErrorResponse({ error });
          const sentryConfig = new SentryConfig();
          const expectedValue = new SentryConfig({
            message: 'Connection to servers is not available.',
            sendToSentry: true,
            showDialog: true,
          });
          spyOnProperty(navigator, 'onLine').and.returnValue(true);

          expect(
            service.setErrorStateWhenUnknown(httpError, sentryConfig),
          ).toEqual(expectedValue);
        });

        it(`should return the populated config object when the HttpErrorResponse does not have a status code and it is offline`, () => {
          const error = new Error();
          const httpError = new HttpErrorResponse({ error });
          const sentryConfig = new SentryConfig();
          const expectedValue = new SentryConfig({
            message: 'No Internet Connection.',
          });
          spyOnProperty(navigator, 'onLine').and.returnValue(false);

          expect(
            service.setErrorStateWhenUnknown(httpError, sentryConfig),
          ).toEqual(expectedValue);
        });

        it(`should return the populated config object when the HttpErrorResponse status code is 403`, () => {
          const error = new Error();
          const httpError = new HttpErrorResponse({ error, status: 403 });
          const sentryConfig = new SentryConfig();
          const expectedValue = new SentryConfig({
            message: 'You do not have permission to view the selected page.',
            sendToSentry: true,
          });

          expect(
            service.setErrorStateWhenUnknown(httpError, sentryConfig),
          ).toEqual(expectedValue);
        });

        it(`should return the populated config object when the HttpErrorResponse status code is 404`, () => {
          const error = new Error();
          const httpError = new HttpErrorResponse({ error, status: 404 });
          const sentryConfig = new SentryConfig();
          const expectedValue = new SentryConfig({
            message: 'Not found.',
          });

          expect(
            service.setErrorStateWhenUnknown(httpError, sentryConfig),
          ).toEqual(expectedValue);
        });
      });

      describe('convertStringMessageToList()', () => {
        it(`should return the passed in error message in a list`, () => {
          const message = 'Test';
          const expectedValue = ['Test'];

          expect(service.convertStringMessageToList(message)).toEqual(
            expectedValue,
          );
        });
      });
    });
