import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from 'ng-mocks';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { environment } from '@env/environment.test';
import { getTranslocoModule } from '@utils/test/transloco-testing-module';
import { LocaleUpperCasePipe } from '@shared/pipes/locale-upper-case.pipe';
import { Logger } from '@utils/logger';
import { SaveCancelComponent } from './save-cancel.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] SaveCancelComponent', () => {
      let component: SaveCancelComponent;
      let fixture: ComponentFixture<SaveCancelComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [getTranslocoModule(), TranslocoTestingModule],
          declarations: [SaveCancelComponent, MockPipe(LocaleUpperCasePipe)],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(SaveCancelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
