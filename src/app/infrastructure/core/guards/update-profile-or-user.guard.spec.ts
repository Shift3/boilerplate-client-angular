import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { UpdateProfileOrUserGuard } from './update-profile-or-user.guard';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { NotificationService } from '../services/notification.service';
import { UserStateService } from '../services/state/user-state.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] UpdateProfileOrUserGuard', () => {
    let guard: UpdateProfileOrUserGuard;
    let injector: TestBed;
    let route: ActivatedRoute;
    let userStateState: UserStateService;
    const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };
    const notificationMock = { showError: jasmine.createSpy('showError') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UpdateProfileOrUserGuard,
          UserStateService,
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                params: { id: 1 },
              },
            },
          },
          { provide: NotificationService, useValue: notificationMock },
          { provide: Router, useValue: routerMock },
        ],
        imports: [HttpClientTestingModule],
      });
      injector = getTestBed();
      guard = injector.inject(UpdateProfileOrUserGuard);
      route = TestBed.inject(ActivatedRoute);
      userStateState = TestBed.inject(UserStateService);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    describe('canActivate()', () => {
      it('should exist', () => {
        const spy = spyOn(guard, 'canActivate');
        expect(spy).toBeTruthy();
      });

      it(`should redirect to the'/user/profile' when isSelf is true`, () => {
        spyOn(userStateState, 'isSelf').and.returnValue(observableOf(true));
        guard.canActivate(route.snapshot).subscribe(() => {
          expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/user/profile');
        });
      });

      it(`should return false when isSelf is true`, () => {
        spyOn(userStateState, 'isSelf').and.returnValue(observableOf(true));
        guard.canActivate(route.snapshot).subscribe((response) => {
          expect(response).toBe(false);
        });
      });

      it(`should return true when isSelf is false`, () => {
        spyOn(userStateState, 'isSelf').and.returnValue(observableOf(false));
        guard.canActivate(route.snapshot).subscribe((response) => {
          expect(response).toBe(true);
        });
      });
    });
  });
