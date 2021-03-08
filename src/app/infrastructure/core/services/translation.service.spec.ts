import { TestBed } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { TranslationService } from '@core/services/translation.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] TranslationService', () => {
      let service: TranslationService;
      const translationMock = {
        profile: 'userProfile.profileLinks.profile',
        changePassword: 'changePassword',
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [TranslationService],
        });
        service = TestBed.inject(TranslationService);
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      describe('getObjectProperty()', () => {
        it('should return translation object property to be read from the JSON files', () => {
          service.getObjectProperty('userProfile.profileLinks', 'profile');
          expect(translationMock.profile);
        });
      });
    });
