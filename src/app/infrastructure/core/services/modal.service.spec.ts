import { TestBed } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { getTranslocoModule } from '@utils/test/transloco-testing-module';
import { Logger } from '@utils/logger';
import { ModalService } from './modal.service';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] ModalService', () => {
      let service: ModalService;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [getTranslocoModule()],
        });
        service = TestBed.inject(ModalService);
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });
    });
