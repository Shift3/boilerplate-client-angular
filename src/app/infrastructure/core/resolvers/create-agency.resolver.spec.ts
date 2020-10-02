import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';

import { AgencyDTO } from '@models/agency';
import { CreateAgencyResolver } from './create-agency.resolver';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] CreateAgencyResolver', () => {
      let resolver: CreateAgencyResolver;
      let injector: TestBed;

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [CreateAgencyResolver],
          imports: [HttpClientTestingModule],
        });
        injector = getTestBed();
        resolver = injector.inject(CreateAgencyResolver);
      });

      it('should be created', () => {
        expect(resolver).toBeTruthy();
      });

      describe('resolve()', () => {
        it('should exist', () => {
          const spy = spyOn(resolver, 'resolve');
          expect(spy).toBeTruthy();
        });

        it('should resolve a new instance of the agency object', () => {
          const expectedValue = new AgencyDTO();
          resolver.resolve().subscribe((response) => {
            expect(response).toEqual(expectedValue);
          });
        });
      });
    });
