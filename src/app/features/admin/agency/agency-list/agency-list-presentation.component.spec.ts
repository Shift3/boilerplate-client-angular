import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent, MockPipe } from 'ng-mocks';

import { AgencyListPresentationComponent } from './agency-list-presentation.component';
import { AgencyTableComponent } from '../agency-table/agency-table.component';
import { environment } from '@env/environment.test';
import { getTranslocoModule } from '@utils/test/transloco-testing-module';
import { LocaleUpperCasePipe } from '@shared/pipes/locale-upper-case.pipe';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgencyListPresentationComponent', () => {
      let component: AgencyListPresentationComponent;
      let fixture: ComponentFixture<AgencyListPresentationComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            AgencyListPresentationComponent,
            MockComponent(AgencyTableComponent),
            MockPipe(LocaleUpperCasePipe),
          ],
          imports: [getTranslocoModule(), RouterTestingModule],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(AgencyListPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
