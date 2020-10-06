import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';

import { AgentDTO } from '@models/agent';
import { CreateAgentResolver } from './create-agent.resolver';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] CreateUserResolver', () => {
      let resolver: CreateAgentResolver;
      let injector: TestBed;

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [CreateAgentResolver],
          imports: [HttpClientTestingModule],
        });
        injector = getTestBed();
        resolver = injector.inject(CreateAgentResolver);
      });

      it('should be created', () => {
        expect(resolver).toBeTruthy();
      });

      describe('resolve()', () => {
        it('should exist', () => {
          const spy = spyOn(resolver, 'resolve');
          expect(spy).toBeTruthy();
        });

        it('should resolve a new instance of the agent object', () => {
          const expectedValue = new AgentDTO();
          resolver.resolve().subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });
      });
    });
