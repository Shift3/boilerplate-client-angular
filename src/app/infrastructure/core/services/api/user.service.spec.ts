import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { ApiService } from './api.service';
import { environment } from '@env/environment.test';
import {
  IChangeUserRequest,
  IUserDTO,
  ChangeUserRequest,
  UserDTO,
} from '@models/user';
import { Logger } from '@utils/logger';
import { NotificationService } from '@core/services/notification.service';
import { UserService } from './user.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] UserService', () => {
    const route = `${environment.apiRoute}/users`;
    let service: UserService;
    let apiService: ApiService;
    let httpTestingController: HttpTestingController;
    const notificationMock = { showSuccess: jasmine.createSpy('showSuccess') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          ApiService,
          UserService,
          { provide: NotificationService, useValue: notificationMock },
        ],
      });
      // Returns a service with the MockBackend so we can test with dummy responses
      service = TestBed.inject(UserService);
      apiService = TestBed.inject(ApiService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
    });
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('getUserList()', () => {
      it ('should use GET as the request method', () => {
        service.getUserList().subscribe();
        const req = httpTestingController.expectOne(route);

        expect(req.request.method).toBe('GET');
      });

      it('should return a list of users', () => {
        const expectedValue: IUserDTO[] = [
          {
            id: 1,
            email: 'test@test.com',
            firstName: 'Test',
            lastName: 'Tester',
            profilePicture: null,
            role: {
              id: 1,
              roleName: 'User',
            },
          },
        ];
        let response: IUserDTO[];
        spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

        service.getUserList().subscribe(res => {
          response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });

    describe('createUser()', () => {
      it ('should use POST as the request method', () => {
        const newUser: IChangeUserRequest = new ChangeUserRequest();
        service.createUser(newUser).subscribe();
        const req = httpTestingController.expectOne(route);

        expect(req.request.method).toBe('POST');
      });

      it('should return the requested user on creation', () => {
        const newUser: IChangeUserRequest = new ChangeUserRequest();
        const expectedValue: IUserDTO = {
            id: 1,
            email: 'test@test.com',
            firstName: 'Test',
            lastName: 'Tester',
            profilePicture: null,
            role: {
              id: 1,
              roleName: 'User',
            },
          };
        let response: IUserDTO;
        spyOn(apiService, 'post').and.returnValue(observableOf(expectedValue));

        service.createUser(newUser).subscribe(res => {
          response = res;
        });

        expect(response).toEqual(expectedValue);
      });

      it(`should show a notification on success`, () => {
        const newUser: IChangeUserRequest = new ChangeUserRequest();
        const expectedValue: IUserDTO = {
          id: 1,
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'Tester',
          profilePicture: null,
          role: {
            id: 1,
            roleName: 'User',
          },
        };
        const message = [`An email has been sent to ${expectedValue.email} with instructions to finish activating the account.`];
        spyOn(apiService, 'post').and.returnValue(observableOf(expectedValue));

        service.createUser(newUser).subscribe(() => {
          expect(notificationMock.showSuccess).toHaveBeenCalledWith(message);
        });
      });
    });

    // TODO: Update test when API implementation updates.
    describe('findUser()', () => {
      it ('should use GET as the request method', () => {
        const id = 1;
        service.findUser(id).subscribe();
        const req = httpTestingController.expectOne(route);

        expect(req.request.method).toBe('GET');
      });

      it('should return the requested user', () => {
        const expectedValue: IUserDTO = {
          id: 1,
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'Tester',
          profilePicture: null,
          role: {
            id: 1,
            roleName: 'User',
          },
        };
        let response: IUserDTO;
        spyOn(service, 'findUser').and.returnValue(observableOf(expectedValue));

        service.findUser(1).subscribe(res => {
          response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });

    describe('updateUser()', () => {
      it ('should use PUT as the request method', () => {
        const user: IChangeUserRequest = new ChangeUserRequest();
        service.updateUser(user, 1).subscribe();
        const req = httpTestingController.expectOne(`${route}/1`);

        expect(req.request.method).toBe('PUT');
      });

      it('should return the requested user on successful update', () => {
        const user: IChangeUserRequest = new ChangeUserRequest();
        const expectedValue: IUserDTO = {
            id: 1,
            email: 'test@test.com',
            firstName: 'Test',
            lastName: 'Tester',
            profilePicture: null,
            role: {
              id: 1,
              roleName: 'User',
            },
          };
        let response: IUserDTO;
        spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

        service.updateUser(user, 1).subscribe(res => {
          response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });

    describe('deleteUser()', () => {
      it ('should use DELETE as the request method', () => {
        const user: IUserDTO = new UserDTO({ id: 1 });
        service.deleteUser(user).subscribe();
        const req = httpTestingController.expectOne(`${route}/1`);

        expect(req.request.method).toBe('DELETE');
      });

      it('should return the updated user on successful deletion', () => {
        const user: IUserDTO = new UserDTO({ id: 1 });
        const expectedValue: IUserDTO = {
            id: 1,
            email: 'test@test.com',
            firstName: 'Test',
            lastName: 'Tester',
            profilePicture: null,
            role: {
              id: 1,
              roleName: 'User',
            },
          };
        let response: IUserDTO;
        spyOn(apiService, 'delete').and.returnValue(observableOf(expectedValue));

        service.deleteUser(user).subscribe(res => {
          response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });

    describe('resendActivationEmail()', () => {
      it ('should use GET as the request method', () => {
        const user: IUserDTO = new UserDTO({ id: 1 });
        service.resendActivationEmail(user).subscribe();
        const req = httpTestingController.expectOne(`${route}/resend-email/1`);

        expect(req.request.method).toBe('GET');
      });

      it(`should show a notification on success`, () => {
        const user: IUserDTO = new UserDTO({
          id: 1,
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'Tester',
          profilePicture: null,
          role: {
            id: 1,
            roleName: 'User',
          },
        });
        const expectedValue = null;
        const message = [`A new activation email was sent to ${user.firstName} ${user.lastName}.`];
        spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

        service.resendActivationEmail(user).subscribe(() => {
          expect(notificationMock.showSuccess).toHaveBeenCalledWith(message);
        });
      });
    });
  });
