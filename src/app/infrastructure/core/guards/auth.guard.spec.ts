import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import {
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthStateService } from '../services/state/auth-state.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { NotificationService } from '../services/notification.service';
import {
  IUserDTO,
  UserDTO,
} from '@models/user';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AuthGuard', () => {
    let guard: AuthGuard;
    let authState: AuthStateService;
    let injector: TestBed;
    const notificationMock = { showError: jasmine.createSpy('showError') };
    const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthGuard,
          AuthStateService,
          { provide: NotificationService, useValue: notificationMock },
          { provide: Router, useValue: routerMock },
        ],
        imports: [HttpClientTestingModule],
      });
      authState = TestBed.inject(AuthStateService);
      injector = getTestBed();
      guard = injector.inject(AuthGuard);
    });
    it('should be created', () => {
      expect(guard).toBeTruthy();
    });
    describe('canActivate()', () => {
      it('should exist', () => {
        const spy = spyOn(guard, 'canActivate');
        expect(spy).toBeTruthy();
      });

      it('should return false when there is no user token', () => {
        guard.canActivate().subscribe(response => {
          expect(response).toEqual(false);
        });
      });

      it(`should redirect to the '/auth' route when there is no user token`, () => {
        guard.canActivate().subscribe();
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/auth');
      });

      it(`should show a notification on failing the guard`, () => {
        const message = ['You cannot view the requested page. Returning to the login page.'];
        guard.canActivate().subscribe(() => {
          expect(notificationMock.showError).toHaveBeenCalledWith(message);
        });
      });

      it(`should redirect to the '/auth' route when navigation fails due to invalid user.`, () => {
        const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO());

        authState.auth$ = mockUser$;
        guard.canActivate().subscribe(() => {
          expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/auth');
        });
      });

      it('should return true for any logged in user', () => {
        const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
          role: {
            id: 2,
            roleName: 'User',
          },
        }));

        authState.auth$ = mockUser$;
        guard.canActivate().subscribe(response => {
          expect(response).toEqual(true);
        });
      });
    });

    describe('canActivateChild()', () => {
      it('should exist', () => {
        const spy = spyOn(guard, 'canActivateChild');
        expect(spy).toBeTruthy();
      });

      it('should call canActivate()', () => {
        const canActivateChildSpy = spyOn(guard, 'canActivateChild');
        const canActivateSpy = spyOn(guard, 'canActivate');
        guard.canActivateChild();
        canActivateChildSpy.and.returnValue(guard.canActivate());
        expect(canActivateChildSpy).toHaveBeenCalled();
        expect(canActivateSpy).toHaveBeenCalled();
      });
    });
  });
