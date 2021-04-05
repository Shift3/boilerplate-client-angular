import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { of as observableOf } from 'rxjs';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { ApiService } from './api.service';
import { AgentService } from './agent.service';
import { environment } from '@env/environment.test';
import {
  AgentDTO,
  AgentRequest,
  IAgentDTO,
  IAgentRequest,
} from '@models/agent';
import { getTranslocoModule } from '@utils/test/transloco-testing-module';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AgentService', () => {
      const route = `${environment.apiRoute}/agents`;
      let testAgent: IAgentDTO;
      let service: AgentService;
      let apiService: ApiService;
      let httpTestingController: HttpTestingController;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            getTranslocoModule(),
            HttpClientTestingModule,
            ToastrTestingModule,
            TranslocoTestingModule,
          ],
          providers: [ApiService, AgentService],
        });
        // Returns a service with the MockBackend so we can test with dummy responses
        service = TestBed.inject(AgentService);
        apiService = TestBed.inject(ApiService);
        // Inject the http service and test controller for each test
        httpTestingController = TestBed.inject(HttpTestingController);
        testAgent = new AgentDTO({
          id: 1,
          name: 'Test Tester',
          email: 'test@test.com',
          content: {
            'en-US': {
              description: 'This is a test',
            },
          },
          phoneNumber: '5595551234',
          address: {
            address1: '123 Main St.',
            address2: '',
            city: 'Fresno',
            state: 'CA',
            zipCode: '93721',
          },
        });
      });
      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      describe('getAgentList()', () => {
        it('should use GET as the request method', () => {
          service.getAgentList().subscribe();
          const req = httpTestingController.expectOne(route);

          expect(req.request.method).toBe('GET');
        });

        it('should return a list of agents', () => {
          const expectedValue: IAgentDTO[] = [{ ...testAgent }];
          let response: IAgentDTO[];
          spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

          service.getAgentList().subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });
      });

      describe('createAgent()', () => {
        it('should use POST as the request method', () => {
          const newUser: IAgentRequest = new AgentRequest();
          service.createAgent(newUser).subscribe();
          const req = httpTestingController.expectOne(route);

          expect(req.request.method).toBe('POST');
        });

        it('should return the requested agent on creation', () => {
          const newAgent: IAgentRequest = new AgentRequest();
          const expectedValue: IAgentDTO = { ...testAgent };
          let response: IAgentDTO;
          spyOn(apiService, 'post').and.returnValue(
            observableOf(expectedValue),
          );

          service.createAgent(newAgent).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });
      });

      describe('findAgent()', () => {
        it('should use GET as the request method', () => {
          const id = 1;
          service.findAgent(id).subscribe();
          const req = httpTestingController.expectOne(`${route}/${id}`);

          expect(req.request.method).toBe('GET');
        });

        it('should return the requested agent', () => {
          const expectedValue: IAgentDTO = { ...testAgent };
          let response: IAgentDTO;
          spyOn(apiService, 'get').and.returnValue(observableOf(expectedValue));

          service.findAgent(1).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });
      });

      describe('updateAgent()', () => {
        it('should use PUT as the request method', () => {
          const agent: IAgentRequest = new AgentRequest();
          service.updateAgent(agent, 1).subscribe();
          const req = httpTestingController.expectOne(`${route}/1`);

          expect(req.request.method).toBe('PUT');
        });

        it('should return the requested agent on successful update', () => {
          const agent: IAgentRequest = new AgentRequest();
          const expectedValue: IAgentDTO = { ...testAgent };
          let response: IAgentDTO;
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.updateAgent(agent, 1).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });
      });

      describe('deleteAgent()', () => {
        it('should use DELETE as the request method', () => {
          const agent: IAgentDTO = new AgentDTO({ id: 1 });
          service.deleteAgent(agent).subscribe();
          const req = httpTestingController.expectOne(`${route}/1`);

          expect(req.request.method).toBe('DELETE');
        });

        it('should return the updated agent on successful deletion', () => {
          const agent: IAgentDTO = new AgentDTO({ id: 1 });
          const expectedValue: IAgentDTO = { ...testAgent };
          let response: IAgentDTO;
          spyOn(apiService, 'delete').and.returnValue(
            observableOf(expectedValue),
          );

          service.deleteAgent(agent).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });
      });
    });
