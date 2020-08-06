import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

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
  });
