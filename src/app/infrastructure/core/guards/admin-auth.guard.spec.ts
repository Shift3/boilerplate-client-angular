import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import {
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth.guard';
import { AuthStateService } from '../services/state/auth-state.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AdminAuthGuard', () => {
    let guard: AdminAuthGuard;
    let injector: TestBed;
    const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AdminAuthGuard, { provide: Router, useValue: routerMock },
          AuthStateService,
        ],
        imports: [HttpClientTestingModule],
      });
      injector = getTestBed();
      guard = injector.inject(AdminAuthGuard);
    });
    it('should be created', () => {
      expect(guard).toBeTruthy();
    });
    describe('canActivate()', () => {
      it('should exist', () => {
        const spy = spyOn(guard, 'canActivate');
        expect(spy).toBeTruthy();
      });

      it('should return false when there is no user token', () => {
        guard.canActivate().subscribe(response => {
          expect(response).toEqual(false);
        });
      });

      it(`should redirect to the '/auth' route when there is no user token`, () => {
        guard.canActivate().subscribe();
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/auth');
      });
    });

    describe('canActivateChild()', () => {
      it('should exist', () => {
        const spy = spyOn(guard, 'canActivateChild');
        expect(spy).toBeTruthy();
      });

      it('should call canActivate()', () => {
        const canActivateChildSpy = spyOn(guard, 'canActivateChild');
        const canActivateSpy = spyOn(guard, 'canActivate');
        guard.canActivateChild();
        canActivateChildSpy.and.returnValue(guard.canActivate());
        expect(canActivateChildSpy).toHaveBeenCalled();
        expect(canActivateSpy).toHaveBeenCalled();
      });
    });
  });
