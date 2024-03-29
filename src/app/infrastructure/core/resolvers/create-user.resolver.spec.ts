import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';

import { CreateUserResolver } from './create-user.resolver';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { UserDTO } from '@models/user';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] CreateUserResolver', () => {
      let resolver: CreateUserResolver;
      let injector: TestBed;

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [CreateUserResolver],
          imports: [HttpClientTestingModule],
        });
        injector = getTestBed();
        resolver = injector.inject(CreateUserResolver);
      });

      it('should be created', () => {
        expect(resolver).toBeTruthy();
      });

      describe('resolve()', () => {
        it('should exist', () => {
          const spy = spyOn(resolver, 'resolve');
          expect(spy).toBeTruthy();
        });

        it('should resolve a new instance of the user object', () => {
          const expectedValue = new UserDTO();
          resolver.resolve().subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });
      });
    });
