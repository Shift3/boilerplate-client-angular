import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import {
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { of as observableOf } from 'rxjs';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { NotificationService } from '../services/notification.service';
import { GetOwnRoleListResolver } from './get-own-role-list.resolver';
import { IRoleDTO, RoleDTO } from '@models/role';
import { UserDTO } from '@models/user';
import { UserStateService } from '../services/state/user-state.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] GetOwnRoleListResolver', () => {
    let injector: TestBed;
    let resolver: GetOwnRoleListResolver;
    let service: UserStateService;
    const notificationMock = { showError: jasmine.createSpy('showError') };
    const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          GetOwnRoleListResolver,
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
      injector = getTestBed();
      resolver = injector.inject(GetOwnRoleListResolver);
      service = TestBed.inject(UserStateService);
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
        spyOn(service, 'getUserSession').and.callThrough();

        resolver.resolve().subscribe(response => {
          expect(response).toEqual(expectedValue);
        });
      });
    });
  });
