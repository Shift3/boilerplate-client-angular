import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TestBed, getTestBed } from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { environment } from '@env/environment.test';
import { GetLoggedInUserResolver } from './get-logged-in-user.resolver';
import { Logger } from '@utils/logger';
import { NotificationService } from '../services/notification.service';
import { RoleCheck } from '@models/role';
import { UserDTO } from '@models/user';
import { UserStateService } from '../services/state/user-state.service';
import { UserService } from '../services/api/user.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] GetLoggedInUserResolver', () => {
      let injector: TestBed;
      let resolver: GetLoggedInUserResolver;
      let userService: UserService;
      let userStateService: UserStateService;
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
        userService = TestBed.inject(UserService);
        userStateService = TestBed.inject(UserStateService);
      });
      it('should be created', () => {
        expect(resolver).toBeTruthy();
      });

      describe('resolve()', () => {
        it('should exist', () => {
          const spy = spyOn(resolver, 'resolve');
          expect(spy).toBeTruthy();
        });

        it(`should resolve an instance of the user object through 'findUser' when 'isAdmin' is true`, () => {
          const userRole = new RoleCheck({
            isAdmin: true,
            isSuperAdmin: true,
            canEdit: true,
          });
          const expectedValue = new UserDTO();
          spyOn(userStateService, 'checkRoleList').and.returnValue(
            observableOf(userRole),
          );
          spyOn(userStateService, 'getUserSession').and.returnValue(
            observableOf(new UserDTO()),
          );
          spyOn(userService, 'findUser').and.returnValue(
            observableOf(new UserDTO()),
          );

          resolver.resolve().subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });

        it(`should resolve an instance of the user object through 'findProfile' when 'isAdmin' is false`, () => {
          const userRole = new RoleCheck({
            isAdmin: false,
            isSuperAdmin: false,
            canEdit: true,
          });
          const expectedValue = new UserDTO();
          spyOn(userStateService, 'checkRoleList').and.returnValue(
            observableOf(userRole),
          );
          spyOn(userStateService, 'getUserSession').and.returnValue(
            observableOf(new UserDTO()),
          );
          spyOn(userService, 'findProfile').and.returnValue(
            observableOf(new UserDTO()),
          );

          resolver.resolve().subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });
      });
    });
