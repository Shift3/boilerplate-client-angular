import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { SelectLanguageComponent } from './select-language.component';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] SelectLanguageComponent', () => {
      let component: SelectLanguageComponent;
      let fixture: ComponentFixture<SelectLanguageComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [SelectLanguageComponent],
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
