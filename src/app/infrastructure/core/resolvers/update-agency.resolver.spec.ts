import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { AgencyDTO } from '@models/agency';
import { AgencyService } from '../services/api/agency.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { NotificationService } from '../services/notification.service';
import { UpdateAgencyResolver } from './update-agency.resolver';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] UpdateAgencyResolver', () => {
    let injector: TestBed;
    let resolver: UpdateAgencyResolver;
    let route: ActivatedRoute;
    let service: AgencyService;
    const notificationMock = { showError: jasmine.createSpy('showError') };
    const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UpdateAgencyResolver,
          AgencyService,
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
      resolver = injector.inject(UpdateAgencyResolver);
      route = TestBed.inject(ActivatedRoute);
      service = TestBed.inject(AgencyService);
    });
    it('should be created', () => {
      expect(resolver).toBeTruthy();
    });

    describe('resolve()', () => {
      it('should exist', () => {
        const spy = spyOn(resolver, 'resolve');
        expect(spy).toBeTruthy();
      });

      it('should resolve an instance of the agency object', () => {
        const expectedValue = new AgencyDTO();
        spyOn(service, 'findAgency').and.returnValue(observableOf(new AgencyDTO()));

        resolver.resolve(route.snapshot).subscribe(response => {
          expect(response).toEqual(expectedValue);
        });
      });
    });
  });
