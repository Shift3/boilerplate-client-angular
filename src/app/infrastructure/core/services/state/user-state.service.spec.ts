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
          activatedAt: null,
          firstName: 'Test',
          lastName: 'Tester',
          profilePicture: null,
          agency: {
            id: 0,
            agencyName: '',
            createdBy: 0,
            deletedAt: '',
            deletedBy: 0,
          },
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
  });
