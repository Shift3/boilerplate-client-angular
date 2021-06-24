import { TestBed } from '@angular/core/testing';

import { BehaviorSubject, of as observableOf } from 'rxjs';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { environment } from '@env/environment.test';
import {
  IUserDTO,
  UserDTO,
  IUserSettingDTO,
  UserSettingDTO,
  Language,
} from '@models/user';
import { Logger } from '@utils/logger';
import { LanguageStateService } from '@core/services/state/language-state.service';
import { RoleCheck } from '@models/role';
import { UserStateService } from './user-state.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] UserStateService', () => {
      let service: UserStateService;
      let testSuperAdministratorUser$ = new BehaviorSubject<IUserDTO>(
        new UserDTO(),
      );
      let testAdminUser$ = new BehaviorSubject<IUserDTO>(new UserDTO());

      const languageStateMock = {
        getActiveLanguage: jasmine
          .createSpy('getActiveLanguage')
          .and.returnValue(observableOf('spanish')),
        setActiveLanguage: jasmine.createSpy('setActiveLanguage'),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            UserStateService,
            { provide: LanguageStateService, useValue: languageStateMock },
          ],
          imports: [TranslocoTestingModule],
        });
        service = TestBed.inject(UserStateService);
        service.userSession$ = new BehaviorSubject<IUserDTO>(null);
        testSuperAdministratorUser$ = new BehaviorSubject<IUserDTO>(
          new UserDTO({
            firstName: 'Test',
            lastName: 'Tester',
            role: {
              id: 2,
              roleKey: 'Super Administrator',
            },
          }),
        );
        testAdminUser$ = new BehaviorSubject<IUserDTO>(
          new UserDTO({
            firstName: 'Test',
            lastName: 'Tester',
            role: {
              id: 1,
              roleKey: 'Admin',
            },
          }),
        );
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      describe('getUserSession()', () => {
        it('should return as an Observable', () => {
          const mockUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
            }),
          );
          const testUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
            }),
          );
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
          const expectedValue: IUserDTO = new UserDTO({
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
              roleKey: '',
            },
            settings: {
              language: {
                language: 'English',
                languageCode: 'en-US',
                currency: 'dollar',
                dateFormat: 'mm/dd/yyyy',
              },
            },
          });
          service.setUserSession(testUser);
          const storedUser = JSON.parse(localStorage.getItem('user'));
          expect(storedUser).toEqual({ ...expectedValue });
        });
      });

      describe('resetUserSession()', () => {
        it('should set the emitted value of userSession$ to a new object instance', () => {
          const testUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
            }),
          );

          service.userSession$ = testUser$;
          service.resetUserSession();
          expect(service.userSession$.getValue()).toEqual(new UserDTO());
        });
      });

      describe('checkRoleList()', () => {
        it(`should return a role object with all false values when there is no user session`, () => {
          const expectedValue = new RoleCheck();

          service.checkRoleList().subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });

        it(`should return a role object with all false values when there is an invalid user`, () => {
          service.checkRoleList().subscribe((response) => {
            const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO());
            const expectedValue = new RoleCheck();

            service.userSession$ = testUser$;
            expect(response).toEqual(expectedValue);
          });
        });

        it(`should return a role object with a true value for 'isValid' when given any role`, () => {
          const testUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
              role: {
                id: 3,
                roleKey: 'User',
              },
            }),
          );
          const expectedValue = new RoleCheck({ isValid: true });

          service.userSession$ = testUser$;
          service.checkRoleList().subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });

        it(`should return a role object with true values for 'isValid' and 'canEdit' when given an 'Editor' role`, () => {
          const testUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
              role: {
                id: 3,
                roleKey: 'Editor',
              },
            }),
          );
          const expectedValue = new RoleCheck({
            isValid: true,
            canEdit: true,
            isAdmin: false,
            isSuperAdmin: false,
          });

          service.userSession$ = testUser$;
          service.checkRoleList().subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });

        it(`should return a role object with true values for 'isValid', 'canEdit', and 'isAdmin' when given an 'Admin' role`, () => {
          const testUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
              role: {
                id: 3,
                roleKey: 'Admin',
              },
            }),
          );
          const expectedValue = new RoleCheck({
            isValid: true,
            canEdit: true,
            isAdmin: true,
            isSuperAdmin: false,
          });

          service.userSession$ = testUser$;
          service.checkRoleList().subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });

        it(`should return a role object with all true values when given a 'Super Administrator' role`, () => {
          const testUser$ = new BehaviorSubject<IUserDTO>(
            new UserDTO({
              firstName: 'Test',
              lastName: 'Tester',
              role: {
                id: 3,
                roleKey: 'Super Administrator',
              },
            }),
          );
          const expectedValue = new RoleCheck({
            isValid: true,
            canEdit: true,
            isAdmin: true,
            isSuperAdmin: true,
          });

          service.userSession$ = testUser$;
          service.checkRoleList().subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });
      });

      describe('setUserSettings()', () => {
        it('should call languageStateService.setActiveLanguage on success', () => {
          const testUser = new UserDTO({
            settings: new UserSettingDTO({
              language: new Language({
                language: 'spanish',
                languageCode: 'es-MX',
              }),
            }),
          });

          service.setUserSettings(testUser);
          expect(languageStateMock.setActiveLanguage).toHaveBeenCalledWith(
            'es-MX',
          );
        });
      });
    });
