import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TestBed, getTestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { RedirectRouteGuard } from './redirect-route.guard';
import { RoleDTO } from '@models/role';
import { IUserDTO, UserDTO } from '@models/user';
import { UserStateService } from '../services/state/user-state.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] RedirectRouteGuard', () => {
      let guard: RedirectRouteGuard;
      let userState: UserStateService;
      let injector: TestBed;
      const routerMock = { parseUrl: jasmine.createSpy('parseUrl') };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            RedirectRouteGuard,
            UserStateService,
            { provide: Router, useValue: routerMock },
          ],
          imports: [HttpClientTestingModule],
        });
        userState = TestBed.inject(UserStateService);
        injector = getTestBed();
        guard = injector.inject(RedirectRouteGuard);
      });

      it('should be created', () => {
        expect(guard).toBeTruthy();
      });

      describe('canActivate()', () => {
        it('should exist', () => {
          const spy = spyOn(guard, 'canActivate');
          expect(spy).toBeTruthy();
        });

        it(`should redirect to '/auth' when the role is not 'isAdmin' or 'isValid'`, () => {
          guard.canActivate().subscribe(() => {
            expect(routerMock.parseUrl).toHaveBeenCalledWith('/auth');
          });
        });

        it(`should redirect to '/admin' when the role is 'isAdmin'`, () => {
          const testUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              role: new RoleDTO({
                roleKey: 'Admin',
              }),
            }),
          );
          userState.userSession$ = testUser$;

          guard.canActivate().subscribe(() => {
            expect(routerMock.parseUrl).toHaveBeenCalledWith('/admin');
          });
        });

        it(`should redirect to '/content' when the role is 'isValid'`, () => {
          const testUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              role: new RoleDTO({
                roleKey: 'Editor',
              }),
            }),
          );
          userState.userSession$ = testUser$;

          guard.canActivate().subscribe(() => {
            expect(routerMock.parseUrl).toHaveBeenCalledWith('/content');
          });
        });
      });
    });
