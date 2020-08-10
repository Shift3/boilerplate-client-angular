import {
  HttpClientTestingModule,
  HttpTestingController,
  } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { ApiService } from './api.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { IUserDTO } from '@models/user';
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
      it ('should use the GET method', () => {
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
  });
