import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BehaviorSubject, of as observableOf } from 'rxjs';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ILoginRequest, LoginRequest, ISessionDTO } from '@models/auth';
import { IUserDTO, UserDTO } from '@models/user';
import { UserStateService } from '../state/user-state.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AuthService', () => {
      const route = `${environment.apiRoute}/auth`;
      let testUser: IUserDTO;
      let testUserSession: ISessionDTO;
      let service: AuthService;
      let apiService: ApiService;
      let httpTestingController: HttpTestingController;
      const userStateMock = {
        setUserSession: jasmine.createSpy('setUserSession'),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [
            ApiService,
            AuthService,
            { provide: UserStateService, useValue: userStateMock },
          ],
        });
        // Returns a service with the MockBackend so we can test with dummy responses
        service = TestBed.inject(AuthService);
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
            roleName: 'User',
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
              roleName: 'User',
            },
          },
          jwtToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        };
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      describe('login()', () => {
        it('should use POST as the request method', () => {
          const payload = new LoginRequest();
          service.login(payload).subscribe();
          const req = httpTestingController.expectOne(`${route}/login/`);

          expect(req.request.method).toBe('POST');
        });

        it('should call the method', () => {
          const requestPayload: ILoginRequest = new LoginRequest();
          const spy = spyOn(apiService, 'post').and.callThrough();

          service.login(requestPayload);
          expect(spy).toHaveBeenCalled();
        });

        it('should return a login session', () => {
          const requestPayload: ILoginRequest = new LoginRequest();
          const expectedValue: ISessionDTO = { ...testUserSession };
          let response: ISessionDTO;
          spyOn(apiService, 'post').and.returnValue(
            observableOf(expectedValue),
          );

          service.login(requestPayload).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });

        it('should call userStateService.setUserSession on success', () => {
          const requestPayload: ILoginRequest = new LoginRequest();
          const expectedValue: ISessionDTO = { ...testUserSession };
          spyOn(apiService, 'post').and.returnValue(
            observableOf(expectedValue),
          );

          service.login(requestPayload).subscribe((response) => {
            expect(userStateMock.setUserSession).toHaveBeenCalledWith(
              response.user,
            );
          });
        });
      });

      describe('logout()', () => {
        it('should use GET as the request method', () => {
          const id = 1;
          service.logout().subscribe();
          const req = httpTestingController.expectOne(`${route}/logout/`);

          expect(req.request.method).toBe('GET');
        });

        it('should call the method', () => {
          const spy = spyOn(apiService, 'get').and.callThrough();

          service.logout();
          expect(spy).toHaveBeenCalled();
        });
      });

      describe('getToken()', () => {
        it('should return as an Observable', () => {
          const mockToken$ = new BehaviorSubject<string>(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          );
          const testToken$ = new BehaviorSubject<string>(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          );
          const expectedValue = testToken$.asObservable();

          service.token$ = mockToken$;
          expect(service.getToken()).toEqual(expectedValue);
        });
      });

      describe('setToken()', () => {
        it('should set the emitted value to the token param', () => {
          const mockToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
          const expectedValue =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

          service.setToken(mockToken);
          expect(service.token$.getValue()).toEqual(expectedValue);
        });
      });

      describe('resetToken()', () => {
        it('should set the emitted value of token$ to empty string', () => {
          const mockToken$ = new BehaviorSubject<string>(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          );

          service.token$ = mockToken$;
          service.resetToken();
          expect(service.token$.getValue()).toEqual('');
        });
      });
    });
