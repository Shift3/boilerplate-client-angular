import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import {
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { NotificationService } from '../services/notification.service';
import { GetRoleListResolver } from './get-role-list.resolver';
import { RoleDTO } from '@models/role';
import { RoleService } from '../services/api/role.service';
import { of } from 'rxjs';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] GetRoleListResolver', () => {
    let injector: TestBed;
    let resolver: GetRoleListResolver;
    let service: RoleService;
    const notificationMock = { showError: jasmine.createSpy('showError') };
    const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          GetRoleListResolver,
          RoleService,
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
      resolver = injector.inject(GetRoleListResolver);
      service = TestBed.inject(RoleService);
    });
    it('should be created', () => {
      expect(resolver).toBeTruthy();
    });

    describe('resolve()', () => {
      it('should exist', () => {
        const spy = spyOn(resolver, 'resolve');
        expect(spy).toBeTruthy();
      });

      it('should resolve the user role object in an array', () => {
        const expectedValue = new Array<RoleDTO>({
          id: 0,
          roleName: '',
        });
        spyOn(service, 'getRoleList').and.returnValue(of(expectedValue));

        resolver.resolve().subscribe(response => {
          expect(response).toEqual(expectedValue);
        });
      });
    });
  });
