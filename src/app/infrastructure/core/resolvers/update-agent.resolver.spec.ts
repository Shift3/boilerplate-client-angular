import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { AgentDTO } from '@models/agent';
import { AgentService } from '../services/api/agent.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { NotificationService } from '../services/notification.service';
import { UpdateAgentResolver } from './update-agent.resolver';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] UpdateAgentResolver', () => {
    let injector: TestBed;
    let resolver: UpdateAgentResolver;
    let route: ActivatedRoute;
    let service: AgentService;
    const notificationMock = { showError: jasmine.createSpy('showError') };
    const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UpdateAgentResolver,
          AgentService,
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                params: { id: 1 },
              },
            },
          },
          {
            provide: NotificationService,
            useValue: notificationMock,
          },
          {
            provide: Router,
            useValue: routerMock,
          },
        ],
        imports: [HttpClientTestingModule],
      });
      injector = getTestBed();
      resolver = injector.inject(UpdateAgentResolver);
      route = TestBed.inject(ActivatedRoute);
      service = TestBed.inject(AgentService);
    });
    it('should be created', () => {
      expect(resolver).toBeTruthy();
    });

    describe('resolve()', () => {
      it('should exist', () => {
        const spy = spyOn(resolver, 'resolve');
        expect(spy).toBeTruthy();
      });

      it('should resolve an instance of the agent object', () => {
        const expectedValue = new AgentDTO();
        resolver.resolve(route.snapshot).subscribe(response => {
          expect(response).toEqual(expectedValue);
        });
      });
    });
  });
