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
    let testSuperAdministratorUser$ = new BehaviorSubject<IUserDTO>(new UserDTO());
    let testAdminUser$ = new BehaviorSubject<IUserDTO>(new UserDTO());
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UserStateService,
        ],
      });
      service = TestBed.inject(UserStateService);
      service.userSession$ = new BehaviorSubject<IUserDTO>(null);
      testSuperAdministratorUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
        firstName: 'Test',
        lastName: 'Tester',
        role: {
          id: 2,
          roleName: 'Super Administrator',
        },
      }));
      testAdminUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
        firstName: 'Test',
        lastName: 'Tester',
        role: {
          id: 1,
          roleName: 'Admin',
        },
      }));
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('getUserSession()', () => {
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

    describe('setUserSession()', () => {
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
        const testUser = new UserDTO({
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
        service.setUserSession(testUser);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        expect(storedUser).toEqual(expectedValue);
      });
    });

    describe('resetUserSession()', () => {
      it('should set the emitted value of userSession$ to null', () => {
        const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
        }));

        service.userSession$ = testUser$;
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
        service.userSession$ = testAdminUser$;
        service.isAdmin().subscribe((response) => {
          expect(response).toEqual(true);
        });
      });

      it(`should emit true when given a role of 'Super Administrator'`, () => {
        service.userSession$ = testSuperAdministratorUser$;
        service.isAdmin().subscribe((response) => {
          expect(response).toEqual(true);
        });
      });

      it(`should emit false when given a non-admin role`, () => {
        const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
          role: {
            id: 4,
            roleName: 'User',
          },
        }));

        service.userSession$ = testUser$;
        service.isAdmin().subscribe((response) => {
          expect(response).toEqual(false);
        });
      });
    });

    describe('canEdit()', () => {
      it(`should emit false when there is no user session`, () => {
        service.canEdit().subscribe((response) => {
          expect(response).toEqual(false);
        });
      });

      it(`should emit false when there is an invalid user`, () => {
        service.canEdit().subscribe((response) => {
          const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO());

          service.userSession$ = testUser$;
          expect(response).toEqual(false);
        });
      });

      it(`should emit true when given a role of 'Admin'`, () => {
        service.userSession$ = testAdminUser$;
        service.canEdit().subscribe((response) => {
          expect(response).toEqual(true);
        });
      });

      it(`should emit true when given a role of 'Super Administrator'`, () => {
        service.userSession$ = testSuperAdministratorUser$;
        service.canEdit().subscribe((response) => {
          expect(response).toEqual(true);
        });
      });

      it(`should emit true when given a role of 'Editor'`, () => {
        const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
          role: {
            id: 3,
            roleName: 'Editor',
          },
        }));

        service.userSession$ = testUser$;
        service.canEdit().subscribe((response) => {
          expect(response).toEqual(true);
        });
      });

      it(`should emit false when given a non-editor role`, () => {
        const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
          role: {
            id: 4,
            roleName: 'User',
          },
        }));

        service.userSession$ = testUser$;
        service.canEdit().subscribe((response) => {
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
          const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO());

          service.userSession$ = testUser$;
          expect(response).toEqual(false);
        });
      });

      it(`should emit true when given any role`, () => {
        const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
          role: {
            id: 3,
            roleName: 'Editor',
          },
        }));

        service.userSession$ = testUser$;
        service.isLoggedInUser().subscribe((response) => {
          expect(response).toEqual(true);
        });
      });
    });
  });
