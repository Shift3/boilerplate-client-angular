import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TestBed, getTestBed } from '@angular/core/testing';

import { BehaviorSubject, of as observableOf } from 'rxjs';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { AuthGuard } from './auth.guard';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { Message } from '@models/message';
import {
  INotificationTranslationKey,
  NotificationTranslationKey,
} from '@models/translation/notification';
import { NotificationService } from '../services/notification.service';
import { IUserDTO, UserDTO } from '@models/user';
import { UserStateService } from '../services/state/user-state.service';
import { RoleCheck } from '@models/role';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AuthGuard', () => {
      let guard: AuthGuard;
      let userState: UserStateService;
      let injector: TestBed;
      const notificationMock = { showError: jasmine.createSpy('showError') };
      const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            AuthGuard,
            UserStateService,
            { provide: NotificationService, useValue: notificationMock },
            { provide: Router, useValue: routerMock },
          ],
          imports: [HttpClientTestingModule, TranslocoTestingModule],
        });
        userState = TestBed.inject(UserStateService);
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
          spyOn(userState, 'checkRoleList').and.returnValue(
            observableOf(new RoleCheck()),
          );
          guard.canActivate().subscribe((response) => {
            expect(response).toEqual(false);
          });
        });

        it(`should redirect to the '/auth' route when there is no user token`, () => {
          spyOn(userState, 'checkRoleList').and.returnValue(
            observableOf(new RoleCheck()),
          );
          guard.canActivate().subscribe(() => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/auth');
          });
        });

        it(`should show a notification on failing the guard`, () => {
          spyOn(userState, 'checkRoleList').and.returnValue(
            observableOf(new RoleCheck()),
          );
          const notificationTranslationKeys: INotificationTranslationKey = new NotificationTranslationKey();
          const message = [
            new Message({
              message: notificationTranslationKeys.cannotViewPageReturnToLogin,
            }),
          ];

          guard.canActivate().subscribe(() => {
            expect(notificationMock.showError).toHaveBeenCalledWith(message);
          });
        });

        it(`should redirect to the '/auth' route when navigation fails due to invalid user.`, () => {
          const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO());

          userState.userSession$ = mockUser$;
          guard.canActivate().subscribe(() => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/auth');
          });
        });

        it('should return true for any logged in user', () => {
          const mockUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
              role: {
                id: 2,
                roleKey: 'User',
              },
            }),
          );

          userState.userSession$ = mockUser$;
          guard.canActivate().subscribe((response) => {
            expect(response).toEqual(true);
          });
        });
      });

      describe('canActivateChild()', () => {
        it('should exist', () => {
          const spy = spyOn(guard, 'canActivateChild');
          expect(spy).toBeTruthy();
        });

        it('should also call canActivate() when calling canActivateChild()', () => {
          const canActivateChildSpy = spyOn(guard, 'canActivateChild');
          const canActivateSpy = spyOn(guard, 'canActivate');

          guard.canActivateChild();
          canActivateChildSpy.and.returnValue(guard.canActivate());
          expect(canActivateChildSpy).toHaveBeenCalled();
          expect(canActivateSpy).toHaveBeenCalled();
        });
      });
    });
