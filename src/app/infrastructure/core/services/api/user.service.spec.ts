import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { ApiService } from './api.service';
import { environment } from '@env/environment.test';
import {
  ChangeUserRequest,
  IChangeUserRequest,
  IUserDTO,
  UserDTO,
} from '@models/user';
import { Logger } from '@utils/logger';
import { UserService } from './user.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] UserService', () => {
    const route = `${environment.apiRoute}/users`;
    let service: UserService;
    let apiService: ApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          ApiService,
          UserService,
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
        spyOn(service, 'getUserList').and.returnValue(observableOf(expectedValue));

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
        spyOn(service, 'createUser').and.returnValue(observableOf(expectedValue));

        service.createUser(newUser).subscribe(res => {
          response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });

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
        spyOn(service, 'updateUser').and.returnValue(observableOf(expectedValue));

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
        spyOn(service, 'deleteUser').and.returnValue(observableOf(expectedValue));

        service.deleteUser(user).subscribe(res => {
          response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });
  });
