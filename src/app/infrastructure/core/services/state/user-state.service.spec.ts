import { TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import {
  IUserDTO,
  UserDTO,
} from '@models/user';
import { UserStateService } from './user-state.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] UserStateService', () => {
    let service: UserStateService;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UserStateService,
        ],
      });
      service = TestBed.inject(UserStateService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('getAuth()', () => {
      it('should return as an Observable', () => {
        const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
        }));
        const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
        }));
        const expectedValue = testUser$.asObservable();

        service.userSession$ = mockUser$;
        expect(service.getUserSession()).toEqual(expectedValue);
      });
    });

    describe('setAuth()', () => {
      it('should set the emitted value to the user param', () => {
        const mockUser = new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
        });
        const expectedValue = new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
        });

        service.setUserSession(mockUser);
        expect(service.userSession$.getValue()).toEqual(expectedValue);
      });

      it('should set user value in localStorage to the user param', () => {
        const mockUser = new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
        });
        const expectedValue = {
          id: 0,
          email: '',
          firstName: 'Test',
          lastName: 'Tester',
          profilePicture: null,
          role: {
            id: 0,
            roleName: '',
          },
        };
        service.setUserSession(mockUser);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        expect(storedUser).toEqual(expectedValue);
      });
    });

    describe('resetAuth()', () => {
      it('should set the emitted value of auth$ to null', () => {
        const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
        }));

        service.userSession$ = mockUser$;
        service.resetUserSession();
        expect(service.userSession$.getValue()).toEqual(null);
      });
    });

    describe('isAdmin()', () => {
      it(`should emit false when there is no user session`, () => {
        service.isAdmin().subscribe((response) => {
          expect(response).toEqual(false);
        });
      });

      it(`should emit false when there is an invalid user`, () => {
        service.isAdmin().subscribe((response) => {
          const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO());

          service.userSession$ = mockUser$;
          expect(response).toEqual(false);
        });
      });

      it(`should emit true when given a role of 'Admin'`, () => {
        const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
          role: {
            id: 2,
            roleName: 'Admin',
          },
        }));

        service.userSession$ = mockUser$;
        service.isAdmin().subscribe((response) => {
          expect(response).toEqual(true);
        });
      });

      it(`should emit true when given a role of 'Super Administrator'`, () => {
        const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
          role: {
            id: 2,
            roleName: 'Super Administrator',
          },
        }));

        service.userSession$ = mockUser$;
        service.isAdmin().subscribe((response) => {
          expect(response).toEqual(true);
        });
      });

      it(`should emit true when given a non-admin role`, () => {
        const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
          role: {
            id: 2,
            roleName: 'User',
          },
        }));

        service.userSession$ = mockUser$;
        service.isAdmin().subscribe((response) => {
          expect(response).toEqual(false);
        });
      });
    });

    describe('isLoggedInUser()', () => {
      it(`should emit false when there is no user session`, () => {
        service.isLoggedInUser().subscribe((response) => {
          expect(response).toEqual(false);
        });
      });

      it(`should emit false when there is an invalid user`, () => {
        service.isLoggedInUser().subscribe((response) => {
          const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO());

          service.userSession$ = mockUser$;
          expect(response).toEqual(false);
        });
      });

      it(`should emit true when given any role`, () => {
        const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
          role: {
            id: 2,
            roleName: 'Editor',
          },
        }));

        service.userSession$ = mockUser$;
        service.isLoggedInUser().subscribe((response) => {
          expect(response).toEqual(true);
        });
      });
    });
  });
