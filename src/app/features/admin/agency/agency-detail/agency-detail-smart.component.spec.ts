import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { AgencyDetailPresentationComponent } from './agency-detail-presentation.component';
import { AgencyDetailSmartComponent } from './agency-detail-smart.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgencyDetailSmartComponent', () => {
      let component: AgencyDetailSmartComponent;
      let fixture: ComponentFixture<AgencyDetailSmartComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            AgencyDetailSmartComponent,
            MockComponent(AgencyDetailPresentationComponent),
          ],
          imports: [
            HttpClientTestingModule,
            ReactiveFormsModule,
            ToastrTestingModule,
            RouterTestingModule,
          ],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(AgencyDetailSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
