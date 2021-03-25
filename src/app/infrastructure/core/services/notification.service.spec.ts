import { TestBed } from '@angular/core/testing';

import { ToastrService } from 'ngx-toastr';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { environment } from '@env/environment.test';
import { getTranslocoModule } from '@utils/test/transloco-testing-module';
import {
  INotificationTranslationKey,
  NotificationTranslationKey,
} from '@models/translation/notification';
import { Logger } from '@utils/logger';
import { Message } from '@models/message';
import { NotificationService } from './notification.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] NotificationService', () => {
      let service: NotificationService;
      const toastrMock = {
        error: jasmine.createSpy('error'),
        success: jasmine.createSpy('success'),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [getTranslocoModule(), TranslocoTestingModule],
          providers: [
            NotificationService,
            { provide: ToastrService, useValue: toastrMock },
          ],
        });
        service = TestBed.inject(NotificationService);
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      describe('showSuccess()', () => {
        it('should call toastrService.success with the messageList parameter', () => {
          const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();
          const messageList = [
            new Message({ message: notificationTranslationKeys.agentCreated }),
          ];

          service.showSuccess(messageList);
          expect(toastrMock.success).toHaveBeenCalled();
        });
      });

      describe('showError()', () => {
        it('should call toastrService.error with the messageList parameter', () => {
          const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();
          const messageList = [
            new Message({
              message: notificationTranslationKeys.cannotViewPage,
            }),
          ];

          service.showError(messageList);
          expect(toastrMock.error).toHaveBeenCalled();
        });
      });
    });
