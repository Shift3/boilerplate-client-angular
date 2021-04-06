import { TestBed } from '@angular/core/testing';

import { TranslocoTestingModule } from '@ngneat/transloco';

import { environment } from '@env/environment.test';
import { DataTransformationService } from '@core/services/data-transformation.service';
import { Logger } from '@utils/logger';
import { LanguageStateService } from '@core/services/state/language-state.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] DataTransformationService', () => {
      let service: DataTransformationService;
      const translationMock = {
        profile: 'userProfile.profileLinks.profile',
        changePassword: 'changePassword',
      };
      const languageStateMock = {
        getTextInDefaultLang: jasmine.createSpy('getTextInDefaultLang'),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [TranslocoTestingModule],
          providers: [
            DataTransformationService,
            { provide: LanguageStateService, useValue: languageStateMock },
          ],
        });
        service = TestBed.inject(DataTransformationService);
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      describe('getObjectProperty()', () => {
        it('should return blank string for empty label', () => {
          const constructedString = service.getObjectProperty(
            'userProfile.profileLinks',
            '',
          );

          expect(constructedString).toEqual('');
        });

        it('should return blank string for null label', () => {
          const constructedString = service.getObjectProperty(
            'userProfile.profileLinks',
            null,
          );

          expect(constructedString).toEqual('');
        });

        it('should return translation object property to be read from the JSON files', () => {
          const constructedString = service.getObjectProperty(
            'userProfile.profileLinks',
            'profile',
          );

          expect(constructedString).toEqual(translationMock.profile);
        });
      });
    });
