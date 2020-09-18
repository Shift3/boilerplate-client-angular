import { TestBed } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { NotificationService } from './notification.service';
import { ToastrService } from 'ngx-toastr';

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
        const messageList = ['Notification'];

        service.showSuccess(messageList);
        expect(toastrMock.success).toHaveBeenCalled();
      });

      it('should call toastrService.success with the messageList as a joined string', () => {
        const messageList = ['Notification'];
        const expectedValue = 'Notification';

        service.showSuccess(messageList);
        expect(toastrMock.success).toHaveBeenCalledWith(expectedValue);
      });
    });

    describe('showError()', () => {
      it('should call toastrService.error with the messageList parameter', () => {
        const messageList = ['Notification'];

        service.showError(messageList);
        expect(toastrMock.error).toHaveBeenCalled();
      });

      it('should call toastrService.error with the messageList as a joined string', () => {
        const messageList = ['Notification'];
        const expectedValue = 'Notification';

        service.showError(messageList);
        expect(toastrMock.error).toHaveBeenCalledWith(expectedValue);
      });
    });
  });
