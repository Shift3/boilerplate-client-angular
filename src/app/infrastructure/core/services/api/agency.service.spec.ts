import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { ApiService } from './api.service';
import {
  AgencyDTO,
  IAgencyDTO,
} from '@models/agency';
import { AgencyService } from './agency.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AgencyService', () => {
    const route = `${environment.apiRoute}/agencies`;
    let testAgency: IAgencyDTO;
    let service: AgencyService;
    let apiService: ApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          ApiService,
          AgencyService,
        ],
      });
      // Returns a service with the MockBackend so we can test with dummy responses
      service = TestBed.inject(AgencyService);
      apiService = TestBed.inject(ApiService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
      testAgency =  new AgencyDTO({
        id: 1,
        agencyName: 'Test Agency',
      });
    });
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('getAgencyList()', () => {
      it ('should use GET as the request method', () => {
        service.getAgencyList().subscribe();
        const req = httpTestingController.expectOne(route);

        expect(req.request.method).toBe('GET');
      });

      it('should return a list of agencies', () => {
        const expectedValue: IAgencyDTO[] = [ { ...testAgency }];
        let response: IAgencyDTO[];
        spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

        service.getAgencyList().subscribe(res => {
          response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });
  });
