import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { AgencyTableComponent } from './agency-table.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgencyTableComponent', () => {
      let component: AgencyTableComponent;
      let fixture: ComponentFixture<AgencyTableComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [AgencyTableComponent],
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
