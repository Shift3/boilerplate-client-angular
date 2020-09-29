import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { ApiService } from './api.service';
import { environment } from '@env/environment.test';
import { IRoleDTO } from '@models/role';
import { Logger } from '@utils/logger';
import { RoleService } from './role.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] RoleService', () => {
    const route = `${environment.apiRoute}/roles`;
    let service: RoleService;
    let apiService: ApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          ApiService,
          RoleService,
        ],
      });
      // Returns a service with the MockBackend so we can test with dummy responses
      service = TestBed.inject(RoleService);
      apiService = TestBed.inject(ApiService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
    });
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('getRoleList()', () => {
      it ('should use GET as the request method', () => {
        service.getRoleList().subscribe();
        const req = httpTestingController.expectOne(route);

        expect(req.request.method).toBe('GET');
      });

      it('should return a list of roles', () => {
        const expectedValue: IRoleDTO[] = [
          {
            id: 1,
            roleName: 'User',
          },
        ];
        let response: IRoleDTO[];
        spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

        service.getRoleList().subscribe(res => {
          response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });
  });
