import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { ChangeUserRequest } from '@models/user';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] ApiService', () => {
      let httpClient: HttpClient;
      let service: ApiService;
      let httpTestingController: HttpTestingController;
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [ApiService],
        });
        httpClient = TestBed.inject(HttpClient);
        service = TestBed.inject(ApiService);
        // Inject the http service and test controller for each test
        httpTestingController = TestBed.inject(HttpTestingController);
      });

      it('should be created', () => {
        expect(ApiService).toBeTruthy();
      });

      describe('get<T>()', () => {
        it('should be created', () => {
          const spy = spyOn(httpClient, 'get');
          expect(spy).toBeTruthy();
        });

        it('should use GET as the request method', () => {
          const route = '/users/';
          service.get(route).subscribe();
          const req = httpTestingController.expectOne(`${route}`);

          expect(req.request.method).toBe('GET');
        });

        afterEach(() => {
          httpTestingController.verify();
        });
      });

      describe('post<T, U>()', () => {
        it('should be created', () => {
          const spy = spyOn(httpClient, 'post');
          expect(spy).toBeTruthy();
        });

        it('should use POST as the request method', () => {
          const route = '/signup/';
          const payload = new ChangeUserRequest();
          service.post(route, payload).subscribe();
          const req = httpTestingController.expectOne(`${route}`);

          expect(req.request.method).toBe('POST');
        });

        afterEach(() => {
          httpTestingController.verify();
        });
      });

      describe('put<T, U>()', () => {
        it('should be created', () => {
          const spy = spyOn(httpClient, 'put');
          expect(spy).toBeTruthy();
        });

        it('should use PUT as the request method', () => {
          const route = '/signup/1';
          const payload = new ChangeUserRequest();
          service.put(route, payload).subscribe();
          const req = httpTestingController.expectOne(`${route}`);

          expect(req.request.method).toBe('PUT');
        });

        afterEach(() => {
          httpTestingController.verify();
        });
      });

      describe('patch<T, U>()', () => {
        it('should be created', () => {
          const spy = spyOn(httpClient, 'patch');
          expect(spy).toBeTruthy();
        });

        it('should use PATCH as the request method', () => {
          const route = '/users/1';
          const payload = new ChangeUserRequest();
          service.patch(route, payload).subscribe();
          const req = httpTestingController.expectOne(`${route}`);

          expect(req.request.method).toBe('PATCH');
        });

        afterEach(() => {
          httpTestingController.verify();
        });
      });

      describe('delete<T>()', () => {
        it('should be created', () => {
          const spy = spyOn(httpClient, 'delete');
          expect(spy).toBeTruthy();
        });

        it('should use DELETE as the request method', () => {
          const route = '/users/1';
          service.delete(route).subscribe();
          const req = httpTestingController.expectOne(`${route}`);

          expect(req.request.method).toBe('DELETE');
        });

        afterEach(() => {
          httpTestingController.verify();
        });
      });
    });
