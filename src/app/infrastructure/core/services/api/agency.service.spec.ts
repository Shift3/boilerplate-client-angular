import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { ApiService } from './api.service';
import {
  AgencyDTO,
  AgencyRequest,
  IAgencyDTO,
  IAgencyRequest,
} from '@models/agency';
import { AgencyService } from './agency.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

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
        imports: [
          HttpClientTestingModule,
          ToastrTestingModule,
        ],
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

    describe('createAgency()', () => {
      it ('should use POST as the request method', () => {
        const newAgency: IAgencyRequest = new AgencyRequest();
        service.createAgency(newAgency).subscribe();
        const req = httpTestingController.expectOne(route);

        expect(req.request.method).toBe('POST');
      });

      it('should return the requested agency on creation', () => {
        const newAgency: IAgencyRequest = new AgencyRequest();
        const expectedValue: IAgencyDTO = { ...testAgency };
        let response: IAgencyDTO;
        spyOn(apiService, 'post').and.returnValue(observableOf(expectedValue));

        service.createAgency(newAgency).subscribe(res => {
        response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });

    describe('findAgency()', () => {
      it ('should use GET as the request method', () => {
        const id = 1;
        service.findAgency(id).subscribe();
        const req = httpTestingController.expectOne(`${route}/${id}`);

        expect(req.request.method).toBe('GET');
      });

      it('should return the requested agency', () => {
        const expectedValue: IAgencyDTO = { ...testAgency };
        let response: IAgencyDTO;
        spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

        service.findAgency(1).subscribe(res => {
        response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });

    describe('updateAgency()', () => {
      it ('should use PUT as the request method', () => {
        const agency: IAgencyRequest = new AgencyRequest();
        service.updateAgency(agency, 1).subscribe();
        const req = httpTestingController.expectOne(`${route}/1`);

        expect(req.request.method).toBe('PUT');
      });

      it('should return the requested agency on successful update', () => {
        const agency: IAgencyRequest = new AgencyRequest();
        const expectedValue: IAgencyDTO = { ...testAgency };
        let response: IAgencyDTO;
        spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

        service.updateAgency(agency, 1).subscribe(res => {
        response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });

    describe('deleteAgency()', () => {
      it ('should use DELETE as the request method', () => {
        const agency: IAgencyDTO = new AgencyDTO({ id: 1 });
        service.deleteAgency(agency).subscribe();
        const req = httpTestingController.expectOne(`${route}/1`);

        expect(req.request.method).toBe('DELETE');
      });

      it('should return the updated agency on successful deletion', () => {
        const agency: IAgencyDTO = new AgencyDTO({ id: 1 });
        const expectedValue: IAgencyDTO = { ...testAgency };
        let response: IAgencyDTO;
        spyOn(apiService, 'delete').and.returnValue(observableOf(expectedValue));

        service.deleteAgency(agency).subscribe(res => {
        response = res;
        });

        expect(response).toEqual(expectedValue);
      });
    });
  });
