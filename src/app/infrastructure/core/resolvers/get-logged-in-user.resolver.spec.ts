import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import {
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { environment } from '@env/environment.test';
import { GetLoggedInUserResolver } from './get-logged-in-user.resolver';
import { Logger } from '@utils/logger';
import { NotificationService } from '../services/notification.service';
import { UserDTO } from '@models/user';
import { UserStateService } from '../services/state/user-state.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] GetLoggedInUserResolver', () => {
    let injector: TestBed;
    let resolver: GetLoggedInUserResolver;
    let service: UserStateService;
    const notificationMock = { showError: jasmine.createSpy('showError') };
    const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          GetLoggedInUserResolver,
          UserStateService,
          {
            provide: NotificationService,
            useValue: notificationMock,
          },
          {
            provide: Router,
            useValue: routerMock,
          },
        ],
        imports: [HttpClientTestingModule],
      });
      injector = getTestBed();
      resolver = injector.inject(GetLoggedInUserResolver);
      service = TestBed.inject(UserStateService);
    });
    it('should be created', () => {
      expect(resolver).toBeTruthy();
    });

    describe('resolve()', () => {
      it('should exist', () => {
        const spy = spyOn(resolver, 'resolve');
        expect(spy).toBeTruthy();
      });

      it('should resolve an instance of the user object', () => {
        const expectedValue = new UserDTO();
        spyOn(service, 'getUserSession').and.returnValue(observableOf(new UserDTO()));

        resolver.resolve().subscribe(response => {
          expect(response).toEqual(expectedValue);
        });
      });
    });
  });
