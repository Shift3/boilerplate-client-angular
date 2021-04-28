import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TestBed, getTestBed } from '@angular/core/testing';

import { of as observableOf } from 'rxjs';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { NotificationService } from '../services/notification.service';
import { UpdateUserResolver } from './update-user.resolver';
import { UserDTO } from '@models/user';
import { UserService } from '../services/api/user.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] UpdateUserResolver', () => {
      let injector: TestBed;
      let resolver: UpdateUserResolver;
      let route: ActivatedRoute;
      let service: UserService;
      const notificationMock = { showError: jasmine.createSpy('showError') };
      const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            UpdateUserResolver,
            UserService,
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
          imports: [HttpClientTestingModule, TranslocoTestingModule],
        });
        injector = getTestBed();
        resolver = injector.inject(UpdateUserResolver);
        route = TestBed.inject(ActivatedRoute);
        service = TestBed.inject(UserService);
      });
      it('should be created', () => {
        expect(resolver).toBeTruthy();
      });

      describe('resolve()', () => {
        it('should exist', () => {
          const spy = spyOn(resolver, 'resolve');
          expect(spy).toBeTruthy();
        });

        it('should resolve an instance of the user object', () => {
          const expectedValue = new UserDTO();
          spyOn(service, 'findUser').and.returnValue(
            observableOf(new UserDTO()),
          );

          resolver.resolve(route.snapshot).subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });
      });
    });
