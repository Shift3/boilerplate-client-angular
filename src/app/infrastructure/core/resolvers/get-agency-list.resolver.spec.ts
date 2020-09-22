import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import {
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { AgencyDTO } from '@models/agency';
import { AgencyService } from '../services/api/agency.service';
import { environment } from '@env/environment.test';
import { GetAgencyListResolver } from './get-agency-list.resolver';
import { Logger } from '@utils/logger';
import { NotificationService } from '../services/notification.service';
import { RoleCheck } from '@models/role';
import { UserDTO } from '@models/user';
import { UserService } from '../services/api/user.service';
import { UserStateService } from '../services/state/user-state.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] GetAgencyListResolver', () => {
    let injector: TestBed;
    let resolver: GetAgencyListResolver;
    let service: AgencyService;
    let userService: UserService;
    let userStateService: UserStateService;
    const notificationMock = { showError: jasmine.createSpy('showError') };
    const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          GetAgencyListResolver,
          AgencyService,
          UserService,
          UserStateService,
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
      userService = TestBed.inject(UserService);
      userStateService = TestBed.inject(UserStateService);
      injector = getTestBed();
      resolver = injector.inject(GetAgencyListResolver);
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

      it(`should resolve agency object in an array through 'getAgencyList' when 'isSuperAdmin' is true`, () => {
        const userRole = new RoleCheck({
          isAdmin: true,
          isSuperAdmin: true,
          canEdit: true,
        });
        const expectedValue = new Array<AgencyDTO>({
          id: 0,
          agencyName: '',
        });
        spyOn(userStateService, 'checkRoleList').and.returnValue(observableOf(userRole));
        spyOn(service, 'getAgencyList').and.returnValue(observableOf(expectedValue));

        resolver.resolve().subscribe(response => {
          expect(response).toEqual(expectedValue);
        });
      });

      it(`should resolve agency object in an array through 'getAgencyList' when 'isSuperAdmin' is false`, () => {
        const userRole = new RoleCheck({
          isAdmin: true,
          isSuperAdmin: false,
          canEdit: true,
        });
        const expectedValue = [
          new AgencyDTO(),
        ];
        spyOn(userStateService, 'checkRoleList').and.returnValue(observableOf(userRole));
        spyOn(userStateService, 'getUserSession').and.returnValue(observableOf(new UserDTO()));
        spyOn(userService, 'findUser').and.returnValue(observableOf(new UserDTO()));

        resolver.resolve().subscribe(response => {
          expect(response).toEqual(expectedValue);
        });
      });
    });
  });
