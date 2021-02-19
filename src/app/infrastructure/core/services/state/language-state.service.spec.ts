import { TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { LanguageStateService } from './language-state.service';
import { TranslocoService, TranslocoTestingModule } from '@ngneat/transloco';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] LanguageStateService', () => {
      let service: LanguageStateService;
      const translocoMock = {
        getActiveLang: jasmine.createSpy('getActiveLang'),
        setActiveLang: jasmine.createSpy('setActiveLang'),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [TranslocoTestingModule],
          providers: [
            LanguageStateService,
            // { provide: TranslocoService, useValue: translocoMock },
          ],
        });
        service = TestBed.inject(LanguageStateService);
        // service.activeLanguage$ = new BehaviorSubject<string>(null);
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });
    });
