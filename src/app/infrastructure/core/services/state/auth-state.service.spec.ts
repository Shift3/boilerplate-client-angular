import { TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';

import { AuthStateService } from './auth-state.service';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import {
  IUserDTO,
  UserDTO,
} from '@models/user';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] AuthStateService', () => {
    let service: AuthStateService;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthStateService,
        ],
      });
      service = TestBed.inject(AuthStateService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('getAuth()', () => {
      it('should return as an Observable', () => {
        const mockUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
        }));
        service.auth$ = mockUser$;
        const testUser$ = new BehaviorSubject<IUserDTO>(new UserDTO({
          firstName: 'Test',
          lastName: 'Tester',
        }));
        const expectedValue = testUser$.asObservable();

        const response = service.getAuth();
        expect(response).toEqual(expectedValue);
      });
    });
  });
