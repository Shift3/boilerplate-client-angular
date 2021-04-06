import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TestBed, getTestBed } from '@angular/core/testing';

import { TranslocoTestingModule } from '@ngneat/transloco';

import { environment } from '@env/environment.test';
import { HasValidLanguageGuard } from './has-valid-language.guard';
import { Logger } from '@utils/logger';
import { Message } from '@models/message';
import { LanguageStateService } from '../services/state/language-state.service';
import {
  INotificationTranslationKey,
  NotificationTranslationKey,
} from '@models/translation/notification';
import { NotificationService } from '../services/notification.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] HasValidLanguageGuard', () => {
      let guard: HasValidLanguageGuard;
      let injector: TestBed;
      let route: ActivatedRoute;
      let languageStateState: LanguageStateService;
      const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };
      const notificationMock = { showError: jasmine.createSpy('showError') };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            HasValidLanguageGuard,
            LanguageStateService,
            {
              provide: ActivatedRoute,
              useValue: {
                snapshot: {
                  params: { languageCode: 'en-US' },
                },
              },
            },
            { provide: NotificationService, useValue: notificationMock },
            { provide: Router, useValue: routerMock },
          ],
          imports: [HttpClientTestingModule, TranslocoTestingModule],
        });
        injector = getTestBed();
        guard = injector.inject(HasValidLanguageGuard);
        route = TestBed.inject(ActivatedRoute);
        languageStateState = TestBed.inject(LanguageStateService);
      });

      it('should be created', () => {
        expect(guard).toBeTruthy();
      });

      describe('canActivate()', () => {
        it('should exist', () => {
          const spy = spyOn(guard, 'canActivate');
          expect(spy).toBeTruthy();
        });

        it(`should redirect to '/content/agent-list' when isValidLanguageCode is false`, () => {
          spyOn(languageStateState, 'isAvailableLanguageCode').and.returnValue(
            false,
          );
          guard.canActivate(route.snapshot).subscribe(() => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith(
              '/content/agent-list',
            );
          });
        });

        it(`should show a notification on failing the guard`, () => {
          const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();
          const message = [
            new Message({
              message:
                notificationTranslationKeys.unableToLoadRequestedLanguage,
            }),
          ];

          spyOn(languageStateState, 'isAvailableLanguageCode').and.returnValue(
            false,
          );
          guard.canActivate(route.snapshot).subscribe(() => {
            expect(notificationMock.showError).toHaveBeenCalledWith(message);
          });
        });

        it(`should return false when isAvailableLanguageCode is false`, () => {
          spyOn(languageStateState, 'isAvailableLanguageCode').and.returnValue(
            false,
          );
          guard.canActivate(route.snapshot).subscribe((response) => {
            expect(response).toBe(false);
          });
        });

        it(`should return true when isAvailableLanguageCode is true`, () => {
          spyOn(languageStateState, 'isAvailableLanguageCode').and.returnValue(
            true,
          );
          guard.canActivate(route.snapshot).subscribe((response) => {
            expect(response).toBe(true);
          });
        });
      });
    });
