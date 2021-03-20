import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { LocaleUpperCasePipe } from '@shared/pipes/locale-upper-case.pipe';
import { Logger } from '@utils/logger';
import { AgencyTableComponent } from './agency-table.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgencyTableComponent', () => {
      let component: AgencyTableComponent;
      let fixture: ComponentFixture<AgencyTableComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [AgencyTableComponent, MockPipe(LocaleUpperCasePipe)],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(AgencyTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
