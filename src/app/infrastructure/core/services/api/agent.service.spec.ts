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
  IAgentTranslationRequest,
  AgentTranslationRequest,
  IAgentTranslation,
  IAgentTranslationList,
  AgentTranslation,
} from '@models/agent';
import { getTranslocoModule } from '@utils/test/transloco-testing-module';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AgentService', () => {
      const route = `${environment.apiRoute}/agents`;
      let anotherTestAgent: IAgentDTO;
      let apiService: ApiService;
      let httpTestingController: HttpTestingController;
      let service: AgentService;
      let testAgent: IAgentDTO;
      let testAgentSetTranslation: IAgentDTO;

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
          dynamicContent: {
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
        anotherTestAgent = new AgentDTO({
          id: 2,
          name: 'Test Tester Testing',
          email: 'test+1@test.com',
          dynamicContent: {
            'en-US': {
              description: 'This is a test',
            },
          },
          phoneNumber: '5595555555',
          address: {
            address1: '123 Main St.',
            address2: '',
            city: 'Fresno',
            state: 'CA',
            zipCode: '93721',
          },
        });
        testAgentSetTranslation = {
          ...testAgent,
          dynamicContent: {
            'es-MX': {
              description: 'Esto es una prueba',
            },
          },
        };
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
          const newAgent: IAgentRequest = new AgentRequest();
          service.createAgent(newAgent).subscribe();
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

      describe('unpackAgentTranslationList', () => {
        it('should return empty translated content when language code requested does not exist on the agent data', () => {
          const agent: IAgentDTO = { ...testAgent };
          const content: IAgentTranslationList = agent.dynamicContent;
          const expectedValue: IAgentTranslation = {
            description: '',
          };
          const value: IAgentTranslation = service.unpackAgentTranslationList(
            content,
            'es-MX',
          );

          expect({ ...value }).toEqual({ ...expectedValue });
        });

        it('should return the translated content for the requested agent', () => {
          const agent: IAgentDTO = { ...testAgent };
          const content: IAgentTranslationList = agent.dynamicContent;
          const expectedValue: IAgentTranslation = {
            description: 'This is a test',
          };
          const value: IAgentTranslation = service.unpackAgentTranslationList(
            content,
            'en-US',
          );

          expect({ ...value }).toEqual({ ...expectedValue });
        });
      });

      describe('getTranslatedAgent()', () => {
        it('should return the equivalent to the entire JSON value of the requested agent when the language requested does not exist on the agent data', () => {
          const agent: IAgentDTO = new AgentDTO({ ...testAgent });
          const expectedValue: IAgentDTO = { ...testAgent };
          const value: IAgentDTO = service.getTranslatedAgent(agent, 'es-MX');

          expect({ ...value }).toEqual({ ...expectedValue });
        });

        it('should return the requested agent with the requested translated content', () => {
          const translatedContent = new AgentTranslation({
            description: 'This is a test',
          });
          const agent: IAgentDTO = new AgentDTO({ ...testAgent });
          const expectedValue: IAgentDTO = {
            ...testAgent,
            translatedContentForDisplay: translatedContent,
          };
          const value: IAgentDTO = service.getTranslatedAgent(agent, 'en-US');

          expect({ ...value }).toEqual({ ...expectedValue });
        });
      });

      describe('getTranslatedAgentList()', () => {
        it('should return the agents in the list with translated content unpacked', () => {
          const translatedContent = new AgentTranslation({
            description: 'This is a test',
          });
          const agentList: IAgentDTO[] = new Array<IAgentDTO>(
            { ...testAgent },
            { ...anotherTestAgent },
          );
          const expectedValue: IAgentDTO[] = [
            {
              ...testAgent,
              translatedContentForDisplay: translatedContent,
            },
            {
              ...anotherTestAgent,
              translatedContentForDisplay: translatedContent,
            },
          ];
          const value: IAgentDTO[] = service.getTranslatedAgentList(
            agentList,
            'en-US',
          );

          expect(value).toEqual(expectedValue);
        });
      });

      describe('createTranslation()', () => {
        it('should use POST as the request method', () => {
          const newTranslation: IAgentTranslationRequest = new AgentTranslationRequest();
          service.createTranslation(newTranslation, 1).subscribe();
          const translationRoute = `${route}/1/translations`;
          const req = httpTestingController.expectOne(translationRoute);

          expect(req.request.method).toBe('POST');
        });

        it('should return the requested agent on creation', () => {
          const newAgentTranslation: IAgentTranslationRequest = new AgentTranslationRequest(
            {
              dynamicContent: {
                'es-MX': {
                  description: 'Esto es una prueba',
                },
              },
            },
          );
          const expectedValue: IAgentDTO = { ...testAgentSetTranslation };
          let response: IAgentDTO;
          spyOn(apiService, 'post').and.returnValue(
            observableOf(expectedValue),
          );

          service.createTranslation(newAgentTranslation, 1).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });
      });

      describe('updateTranslation()', () => {
        it('should use PUT as the request method', () => {
          const agentTranslation: IAgentTranslationRequest = new AgentTranslationRequest();
          service.updateTranslation(agentTranslation, 1).subscribe();
          const translationRoute = `${route}/1/translations`;
          const req = httpTestingController.expectOne(translationRoute);

          expect(req.request.method).toBe('PUT');
        });

        it('should return the requested agent on successful update', () => {
          const agentTranslation: IAgentTranslationRequest = new AgentTranslationRequest(
            {
              dynamicContent: {
                'es-MX': {
                  description: 'Esto es una prueba',
                },
              },
            },
          );
          const expectedValue: IAgentDTO = { ...testAgentSetTranslation };
          let response: IAgentDTO;
          spyOn(apiService, 'put').and.returnValue(observableOf(expectedValue));

          service.updateTranslation(agentTranslation, 1).subscribe((res) => {
            response = res;
          });

          expect(response).toEqual(expectedValue);
        });
      });
    });
