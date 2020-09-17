import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  BehaviorSubject,
  of as observableOf,
} from 'rxjs';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import {
  ILoginRequest,
  LoginRequest,
  ISessionDTO,
} from '@models/auth';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AuthService', () => {
    let service: AuthService;
    let apiService: ApiService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          ApiService,
          AuthService,
        ],
      });
      // Returns a service with the MockBackend so we can test with dummy responses
      service = TestBed.inject(AuthService);
      apiService = TestBed.inject(ApiService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
    });
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('login()', () => {
      it('should call the method', () => {
        const requestPayload: ILoginRequest = new LoginRequest();
        const spy = spyOn(service, 'login').and.callThrough();

        service.login(requestPayload);
        expect(spy).toHaveBeenCalled();
      });

      it('should return a login session', () => {
        const requestPayload: ILoginRequest = new LoginRequest();
        const expectedValue: ISessionDTO = {
          user: {
            id: 1,
            email: 'test@test.com',
            activatedAt: null,
            firstName: 'Test',
            lastName: 'Tester',
            profilePicture: null,
            agency: {
              id: 1,
              agencyName: 'Test',
            },
            role: {
              id: 1,
              roleName: 'User',
            },
          },
          jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        };
        let response: ISessionDTO;
        spyOn(service, 'login').and.returnValue(observableOf(expectedValue));

        service.login(requestPayload).subscribe(res => {
          response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });

    describe('logout()', () => {
      it('should call the method', () => {
        const spy = spyOn(service, 'logout').and.callThrough();

        service.logout();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('getToken()', () => {
      it('should return as an Observable', () => {
        const mockToken$ = new BehaviorSubject<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
        const testToken$ = new BehaviorSubject<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
        const expectedValue = testToken$.asObservable();

        service.token$ = mockToken$;
        expect(service.getToken()).toEqual(expectedValue);
      });
    });

    describe('setToken()', () => {
      it('should set the emitted value to the token param', () => {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const expectedValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

        service.setToken(mockToken);
        expect(service.token$.getValue()).toEqual(expectedValue);
      });
    });

    describe('resetToken()', () => {
      it('should set the emitted value of token$ to empty string', () => {
        const mockToken$ = new BehaviorSubject<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');

        service.token$ = mockToken$;
        service.resetToken();
        expect(service.token$.getValue()).toEqual('');
      });
    });
  });
