import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { environment } from '@env/environment.test';
import {
  ChangePasswordRequest,
  ChangeUserRequest,
  ChangeUserSettingRequest,
  ForgotPasswordRequest,
  IChangePasswordRequest,
  IChangeUserRequest,
  IChangeUserSettingRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
  IUserDTO,
  IUserSettingDTO,
  ResetPasswordRequest,
  UserDTO,
} from '@models/user';
import { Logger } from '@utils/logger';
import { NotificationService } from '@core/services/notification.service';
import { ISessionDTO, ISignupRequest, SignupRequest } from '@models/auth';
import { UserService } from './user.service';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';
import { UserStateService } from '../state/user-state.service';
import { IMessage } from '@models/message';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] UserService', () => {
      const route = `${environment.apiRoute}/users`;
      let testUser: IUserDTO;
      let testUserSession: ISessionDTO;
      let service: UserService;
      let apiService: ApiService;
      let httpTestingController: HttpTestingController;
      const authMock = { setToken: jasmine.createSpy('setToken') };
      const notificationMock = {
        showSuccess: jasmine.createSpy('showSuccess'),
      };
      const userStateMock = {
        setUserSession: jasmine.createSpy('setUserSession'),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, ToastrTestingModule],
          providers: [
            ApiService,
            UserService,
            { provide: AuthService, useValue: authMock },
            { provide: NotificationService, useValue: notificationMock },
            { provide: UserStateService, useValue: userStateMock },
          ],
        });
        // Returns a service with the MockBackend so we can test with dummy responses
        service = TestBed.inject(UserService);
        apiService = TestBed.inject(ApiService);
        // Inject the http service and test controller for each test
        httpTestingController = TestBed.inject(HttpTestingController);
        testUser = new UserDTO({
          id: 1,
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'Tester',
          profilePicture: null,
          role: {
            id: 1,
            roleKey: 'User',
          },
        });
        testUserSession = {
          user: {
            id: 1,
            email: 'test@test.com',
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
              id: 1,
              roleKey: 'User',
            },
          },
          jwtToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        };
      });
      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      describe('signUp()', () => {
        it('should use POST as the request method', () => {
          const payload: ISignupRequest = new SignupRequest();
          service.signUp(payload).subscribe();
          const req = httpTestingController.expectOne(`${route}/signup/`);

          expect(req.request.method).toBe('POST');
        });

        it('should return the new user object on success', () => {
          const payload: ISignupRequest = new SignupRequest();
          const expectedValue: IUserDTO = new UserDTO();
          let response: IUserDTO;
          spyOn(apiService, 'post').and.returnValue(
            observableOf(expectedValue),
          );

          service.signUp(payload).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });

        it(`should show a notification on success`, () => {
          const payload: ISignupRequest = new SignupRequest();
          const expectedValue: IUserDTO = new UserDTO();
          spyOn(apiService, 'post').and.returnValue(
            observableOf(expectedValue),
          );

          service.signUp(payload).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });

      describe('forgotPassword()', () => {
        it('should use POST as the request method', () => {
          const payload: IForgotPasswordRequest = new ForgotPasswordRequest();
          service.forgotPassword(payload).subscribe();
          const req = httpTestingController.expectOne(
            `${route}/forgot-password/`,
          );

          expect(req.request.method).toBe('POST');
        });

        it('should return a status message on success', () => {
          const payload: IForgotPasswordRequest = new ForgotPasswordRequest();
          const expectedValue: IMessage = {
            type: 'static',
            message: '',
          };
          let response: IMessage;
          spyOn(apiService, 'post').and.returnValue(
            observableOf(expectedValue),
          );

          service.forgotPassword(payload).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });

        it(`should show a notification on success`, () => {
          const payload: IForgotPasswordRequest = new ForgotPasswordRequest();
          const expectedValue: IMessage = {
            type: 'static',
            message: 'Success',
          };
          spyOn(apiService, 'post').and.returnValue(
            observableOf(expectedValue),
          );

          service.forgotPassword(payload).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });

      describe('resetPassword()', () => {
        it('should use PUT as the request method', () => {
          const payload: IResetPasswordRequest = new ResetPasswordRequest();
          const token = '';
          service.resetPassword(payload, token).subscribe();
          const req = httpTestingController.expectOne(
            `${route}/reset-password/${token}`,
          );

          expect(req.request.method).toBe('PUT');
        });

        it('should return the requested user on successful reset', () => {
          const payload: IResetPasswordRequest = new ResetPasswordRequest();
          const token = '';
          const expectedValue: IUserDTO = { ...testUser };
          let response: IUserDTO;
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.resetPassword(payload, token).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });

        it(`should show a notification on success`, () => {
          const payload: IResetPasswordRequest = new ResetPasswordRequest();
          const token = '';
          const expectedValue: IUserDTO = { ...testUser };
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.resetPassword(payload, token).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });

      describe('activateAccount()', () => {
        it('should use PUT as the request method', () => {
          const payload: IResetPasswordRequest = new ResetPasswordRequest();
          const token = '';
          service.activateAccount(payload, token).subscribe();
          const req = httpTestingController.expectOne(
            `${route}/activate-account/${token}`,
          );

          expect(req.request.method).toBe('PUT');
        });

        it('should return the requested user on successful activation', () => {
          const payload: IResetPasswordRequest = new ResetPasswordRequest();
          const token = '';
          const expectedValue: IUserDTO = { ...testUser };
          let response: IUserDTO;
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.activateAccount(payload, token).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });

        it(`should show a notification on success`, () => {
          const payload: IResetPasswordRequest = new ResetPasswordRequest();
          const token = '';
          const expectedValue: IUserDTO = { ...testUser };
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.activateAccount(payload, token).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });

      describe('findProfile()', () => {
        it('should use GET as the request method', () => {
          const id = 1;
          service.findProfile(id).subscribe();
          const req = httpTestingController.expectOne(`${route}/profile/${id}`);

          expect(req.request.method).toBe('GET');
        });

        it('should return the requested user', () => {
          const expectedValue: IUserDTO = { ...testUser };
          let response: IUserDTO;
          spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

          service.findProfile(1).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });
      });

      describe('updateProfile()', () => {
        it('should use PUT as the request method', () => {
          const profile: IChangeUserRequest = new ChangeUserRequest();
          service.updateProfile(profile, 1).subscribe();
          const req = httpTestingController.expectOne(`${route}/profile/1`);

          expect(req.request.method).toBe('PUT');
        });

        it('should return the requested user on successful update', () => {
          const profile: IChangeUserRequest = new ChangeUserRequest();
          const expectedValue: IUserDTO = { ...testUser };
          let response: IUserDTO;
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.updateProfile(profile, 1).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });

        it(`should show a notification on success`, () => {
          const profile: IChangeUserRequest = new ChangeUserRequest();
          const expectedValue: IUserDTO = { ...testUser };
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.updateProfile(profile, 1).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });

      describe('getUserList()', () => {
        it('should use GET as the request method', () => {
          service.getUserList().subscribe();
          const req = httpTestingController.expectOne(route);

          expect(req.request.method).toBe('GET');
        });

        it('should use GET as the request method and add query parameters when they are provided', () => {
          const agencyId = 1;
          const userRoute = `${route}?agencyId=${agencyId}`;
          service.getUserList(agencyId).subscribe();
          const req = httpTestingController.expectOne(userRoute);

          expect(req.request.method).toBe('GET');
        });

        it('should return a list of users', () => {
          const expectedValue: IUserDTO[] = [{ ...testUser }];
          let response: IUserDTO[];
          spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

          service.getUserList().subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });
      });

      describe('createUser()', () => {
        it('should use POST as the request method', () => {
          const newUser: IChangeUserRequest = new ChangeUserRequest();
          service.createUser(newUser).subscribe();
          const req = httpTestingController.expectOne(route);

          expect(req.request.method).toBe('POST');
        });

        it('should return the requested user on creation', () => {
          const newUser: IChangeUserRequest = new ChangeUserRequest();
          const expectedValue: IUserDTO = { ...testUser };
          let response: IUserDTO;
          spyOn(apiService, 'post').and.returnValue(
            observableOf(expectedValue),
          );

          service.createUser(newUser).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });

        it(`should show a notification on success`, () => {
          const newUser: IChangeUserRequest = new ChangeUserRequest();
          const expectedValue: IUserDTO = { ...testUser };
          spyOn(apiService, 'post').and.returnValue(
            observableOf(expectedValue),
          );

          service.createUser(newUser).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });

      describe('findUser()', () => {
        it('should use GET as the request method', () => {
          const id = 1;
          service.findUser(id).subscribe();
          const req = httpTestingController.expectOne(`${route}/${id}`);

          expect(req.request.method).toBe('GET');
        });

        it('should return the requested user', () => {
          const expectedValue: IUserDTO = { ...testUser };
          let response: IUserDTO;
          spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

          service.findUser(1).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });
      });

      describe('changePassword()', () => {
        it('should use PUT as the request method', () => {
          const newPassword: IChangePasswordRequest = new ChangePasswordRequest();
          service.changePassword(newPassword, 1).subscribe();
          const req = httpTestingController.expectOne(
            `${route}/change-password/1`,
          );

          expect(req.request.method).toBe('PUT');
        });

        it('should return the updated user session on successful update', () => {
          const newPassword: IChangePasswordRequest = new ChangePasswordRequest();
          const expectedValue: ISessionDTO = { ...testUserSession };
          let response: ISessionDTO;
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.changePassword(newPassword, 1).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });

        it(`should call userStateService.setUserSession on success`, () => {
          const newPassword: IChangePasswordRequest = new ChangePasswordRequest();
          const expectedValue: ISessionDTO = { ...testUserSession };
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.changePassword(newPassword, 1).subscribe((response) => {
            expect(userStateMock.setUserSession).toHaveBeenCalledWith(
              response.user,
            );
          });
        });

        it(`should call authService.setToken on success`, () => {
          const newPassword: IChangePasswordRequest = new ChangePasswordRequest();
          const expectedValue: ISessionDTO = { ...testUserSession };
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.changePassword(newPassword, 1).subscribe((response) => {
            expect(authMock.setToken).toHaveBeenCalledWith(response.jwtToken);
          });
        });

        it(`should show a notification on success`, () => {
          const newPassword: IChangePasswordRequest = new ChangePasswordRequest();
          const expectedValue: ISessionDTO = { ...testUserSession };
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.changePassword(newPassword, 1).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });

      describe('updateUser()', () => {
        it('should use PUT as the request method', () => {
          const user: IChangeUserRequest = new ChangeUserRequest();
          service.updateUser(user, 1).subscribe();
          const req = httpTestingController.expectOne(`${route}/1`);

          expect(req.request.method).toBe('PUT');
        });

        it('should return the requested user on successful update', () => {
          const user: IChangeUserRequest = new ChangeUserRequest();
          const expectedValue: IUserDTO = { ...testUser };
          let response: IUserDTO;
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.updateUser(user, 1).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });

        it(`should show a notification on success`, () => {
          const user: IChangeUserRequest = new ChangeUserRequest();
          const expectedValue: IUserDTO = { ...testUser };
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.updateUser(user, 1).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });

      describe('deleteUser()', () => {
        it('should use DELETE as the request method', () => {
          const user: IUserDTO = new UserDTO({ id: 1 });
          service.deleteUser(user).subscribe();
          const req = httpTestingController.expectOne(`${route}/1`);

          expect(req.request.method).toBe('DELETE');
        });

        it('should return the updated user on successful deletion', () => {
          const user: IUserDTO = new UserDTO({ id: 1 });
          const expectedValue: IUserDTO = { ...testUser };
          let response: IUserDTO;
          spyOn(apiService, 'delete').and.returnValue(
            observableOf(expectedValue),
          );

          service.deleteUser(user).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });

        it(`should show a notification on success`, () => {
          const user: IUserDTO = new UserDTO({ id: 1 });
          const expectedValue: IUserDTO = { ...testUser };
          spyOn(apiService, 'delete').and.returnValue(
            observableOf(expectedValue),
          );

          service.deleteUser(user).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });

      describe('resendActivationEmail()', () => {
        it('should use GET as the request method', () => {
          const user: IUserDTO = new UserDTO({ id: 1 });
          service.resendActivationEmail(user).subscribe();
          const req = httpTestingController.expectOne(
            `${route}/resend-activation-email/1`,
          );

          expect(req.request.method).toBe('GET');
        });

        it(`should show a notification on success`, () => {
          const user: IUserDTO = new UserDTO({ ...testUser });
          const expectedValue = null;
          spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

          service.resendActivationEmail(user).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });

      describe('updateUserSetting()', () => {
        it('should use PUT as the request method', () => {
          const userSetting: IChangeUserSettingRequest = new ChangeUserSettingRequest(
            {
              language: 'en-US',
            },
          );
          service.updateUserSetting(userSetting, 1).subscribe();
          const req = httpTestingController.expectOne(`${route}/1/settings`);

          expect(req.request.method).toBe('PUT');
        });

        it('should show a notification on success', () => {
          const userSetting: IChangeUserSettingRequest = new ChangeUserSettingRequest(
            {
              language: 'es-MX',
            },
          );
          const expectedValue: IUserSettingDTO = {
            language: {
              language: 'Spanish',
              languageCode: 'es-MX',
            },
            userId: 1,
          };

          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.updateUserSetting(userSetting, 1).subscribe(() => {
            expect(notificationMock.showSuccess).toHaveBeenCalled();
          });
        });
      });
    });
