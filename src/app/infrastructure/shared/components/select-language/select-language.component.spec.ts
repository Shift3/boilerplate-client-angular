import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from 'ng-mocks';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { environment } from '@env/environment.test';
import { getTranslocoModule } from '@utils/test/transloco-testing-module';
import { LocaleUpperCasePipe } from '@shared/pipes/locale-upper-case.pipe';
import { Logger } from '@utils/logger';
import { SelectLanguageComponent } from './select-language.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] SelectLanguageComponent', () => {
      let component: SelectLanguageComponent;
      let fixture: ComponentFixture<SelectLanguageComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            SelectLanguageComponent,
            MockPipe(LocaleUpperCasePipe),
          ],
          imports: [getTranslocoModule(), TranslocoTestingModule],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(SelectLanguageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
