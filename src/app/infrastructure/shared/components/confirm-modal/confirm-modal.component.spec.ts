import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { ConfirmModalComponent } from './confirm-modal.component';
import { environment } from '@env/environment.test';
import { getTranslocoModule } from '@utils/test/transloco-testing-module';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ConfirmModalComponent', () => {
      let component: ConfirmModalComponent;
      let fixture: ComponentFixture<ConfirmModalComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ConfirmModalComponent],
          imports: [getTranslocoModule(), TranslocoTestingModule],
          providers: [NgbActiveModal],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
