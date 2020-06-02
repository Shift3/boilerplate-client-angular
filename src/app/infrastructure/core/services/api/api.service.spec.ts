import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] ApiService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ApiService],
        imports: [HttpClientTestingModule],
      });
    });
    it('should be created', () => {
      expect(ApiService).toBeTruthy();
    });
    describe('get<T>()', () => {
      function setup() {
        const service: ApiService = TestBed.inject(ApiService);
        const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);
        return { service, httpTestingController };
      }
      it('should be created', () => {
        const { service } = setup();
        const spy = spyOn(service, 'get');
        expect(spy).toBeTruthy();
      });
      afterEach(() => {
        const { httpTestingController } = setup();
        httpTestingController.verify();
      });
    });
    describe('post<T, U>()', () => {
      function setup() {
        const service: ApiService = TestBed.inject(ApiService);
        const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);
        return { service, httpTestingController };
      }
      it('should be created', () => {
        const { service } = setup();
        const spy = spyOn(service, 'post');
        expect(spy).toBeTruthy();
      });
      afterEach(() => {
        const { httpTestingController } = setup();
        httpTestingController.verify();
      });
    });
    describe('put<T, U>()', () => {
      function setup() {
        const service: ApiService = TestBed.inject(ApiService);
        const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);
        return { service, httpTestingController };
      }
      it('should be created', () => {
        const { service } = setup();
        const spy = spyOn(service, 'put');
        expect(spy).toBeTruthy();
      });
      afterEach(() => {
        const { httpTestingController } = setup();
        httpTestingController.verify();
      });
    });
    describe('patch<T, U>()', () => {
      function setup() {
        const service: ApiService = TestBed.inject(ApiService);
        const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);
        return { service, httpTestingController };
      }
      it('should be created', () => {
        const { service } = setup();
        const spy = spyOn(service, 'patch');
        expect(spy).toBeTruthy();
      });
      afterEach(() => {
        const { httpTestingController } = setup();
        httpTestingController.verify();
      });
    });
    describe('delete<T>()', () => {
      function setup() {
        const service: ApiService = TestBed.inject(ApiService);
        const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);
        return { service, httpTestingController };
      }
      it('should be created', () => {
        const { service } = setup();
        const spy = spyOn(service, 'delete');
        expect(spy).toBeTruthy();
      });
      afterEach(() => {
        const { httpTestingController } = setup();
        httpTestingController.verify();
      });
    });
  });

