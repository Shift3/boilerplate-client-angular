import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { AgencyListPresentationComponent } from './agency-list-presentation.component';
import { AgencyListSmartComponent } from './agency-list-smart.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgencyListSmartComponent', () => {
      let component: AgencyListSmartComponent;
      let fixture: ComponentFixture<AgencyListSmartComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              AgencyListSmartComponent,
              MockComponent(AgencyListPresentationComponent),
            ],
            imports: [
              HttpClientTestingModule,
              RouterTestingModule,
              ToastrTestingModule,
            ],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(AgencyListSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
