import { TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';

import { AuthStateService } from './auth-state.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import {
  IUserDTO,
  UserDTO,
} from '@models/user';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AuthStateService', () => {
    let service: AuthStateService;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthStateService,
        ],
      });
      service = TestBed.inject(AuthStateService);
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
        service.auth$ = mockUser$;
        const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
        }));
        const expectedValue = testUser$.asObservable();

        const response = service.getAuth();
        expect(response).toEqual(expectedValue);
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

          service.auth$ = mockUser$;
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

        service.auth$ = mockUser$;
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

        service.auth$ = mockUser$;
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

        service.auth$ = mockUser$;
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

          service.auth$ = mockUser$;
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

        service.auth$ = mockUser$;
        service.isLoggedInUser().subscribe((response) => {
          expect(response).toEqual(true);
        });
      });
    });
  });
