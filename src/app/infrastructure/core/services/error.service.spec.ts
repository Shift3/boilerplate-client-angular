import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { ErrorService } from './error.service';
import { Logger } from '@utils/logger';
import { Message } from '@models/message';
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
          const error = new Error('agencyCreated');
          const expectedValue = [
            new Message({ message: 'notification.agencyCreated' }),
          ];

          expect(service.getClientMessage(error)).toEqual(expectedValue);
        });

        it(`should return 'No Internet Connection.' in a list when the client reports being offline`, () => {
          const error = new Error('test');
          const expectedValue = [
            new Message({ message: 'notification.noInternet' }),
          ];
          spyOnProperty(navigator, 'onLine').and.returnValue(false);

          expect(service.getClientMessage(error)).toEqual(expectedValue);
        });
      });

      describe('getServerMessage()', () => {
        it(`should return the passed in error message in a list`, () => {
          const error = new Error('Test');
          const httpError = new HttpErrorResponse({ error });
          const expectedValue = [
            new Message({ type: 'dynamic', message: 'Test' }),
          ];

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
            message: new Message({ message: 'notification.serverError' }),
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
            message: new Message({
              message: 'notification.noServerConnection',
            }),
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
            message: new Message({ message: 'notification.noInternet' }),
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
            message: new Message({ message: 'notification.forbidden' }),
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
            message: new Message({ message: 'notification.notFound' }),
          });

          expect(
            service.setErrorStateWhenUnknown(httpError, sentryConfig),
          ).toEqual(expectedValue);
        });
      });

      describe('convertMessageToMessageList()', () => {
        it(`should return the passed in error message in a list`, () => {
          const message = new Message({ message: 'notification.test' });
          const expectedValue = [new Message({ message: 'notification.test' })];

          expect(service.convertMessageToMessageList(message)).toEqual(
            expectedValue,
          );
        });
      });
    });
