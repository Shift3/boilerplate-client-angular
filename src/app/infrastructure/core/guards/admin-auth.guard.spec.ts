import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TestBed, getTestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';

import { AdminAuthGuard } from './admin-auth.guard';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { Message } from '@models/message';
import { INotification, Notification } from '@models/translation/notification';
import { NotificationService } from '../services/notification.service';
import { IUserDTO, UserDTO } from '@models/user';
import { UserStateService } from '../services/state/user-state.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AdminAuthGuard', () => {
      let guard: AdminAuthGuard;
      let userStateState: UserStateService;
      let injector: TestBed;
      const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };
      const notificationMock = { showError: jasmine.createSpy('showError') };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            AdminAuthGuard,
            UserStateService,
            { provide: NotificationService, useValue: notificationMock },
            { provide: Router, useValue: routerMock },
          ],
          imports: [HttpClientTestingModule],
        });
        userStateState = TestBed.inject(UserStateService);
        injector = getTestBed();
        guard = injector.inject(AdminAuthGuard);
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
          guard.canActivate().subscribe((response) => {
            expect(response).toEqual(false);
          });
        });

        it(`should redirect to the root '/' route when there is no user token`, () => {
          guard.canActivate().subscribe(() => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
          });
        });

        it(`should show a notification on failing the guard`, () => {
          const notification: INotification = new Notification();
          const message = [
            new Message({
              message: notification.cannotViewPageReturnToDashboard,
            }),
          ];

          guard.canActivate().subscribe(() => {
            expect(notificationMock.showError).toHaveBeenCalledWith(message);
          });
        });

        it(`should redirect to the root '/' route when navigation fails due to non-admin role.`, () => {
          const mockUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
              role: {
                id: 2,
                roleName: 'User',
              },
            }),
          );

          userStateState.userSession$ = mockUser$;
          guard.canActivate().subscribe(() => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
          });
        });

        it('should return true for an Admin', () => {
          const mockUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
              role: {
                id: 2,
                roleName: 'Admin',
              },
            }),
          );

          userStateState.userSession$ = mockUser$;
          guard.canActivate().subscribe((response) => {
            expect(response).toEqual(true);
          });
        });

        it('should return true for a Super Administrator', () => {
          const mockUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
              role: {
                id: 2,
                roleName: 'Super Administrator',
              },
            }),
          );

          userStateState.userSession$ = mockUser$;
          guard.canActivate().subscribe((response) => {
            expect(response).toEqual(true);
          });
        });

        it('should return false for a non-admin user', () => {
          const mockUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
              role: {
                id: 2,
                roleName: 'Editor',
              },
            }),
          );

          userStateState.userSession$ = mockUser$;
          guard.canActivate().subscribe((response) => {
            expect(response).toEqual(false);
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
