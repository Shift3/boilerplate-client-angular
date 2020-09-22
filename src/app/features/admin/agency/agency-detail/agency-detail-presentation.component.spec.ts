import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { AgencyDetailPresentationComponent } from './agency-detail-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgencyDetailPresentationComponent', () => {
    let component: AgencyDetailPresentationComponent;
    let fixture: ComponentFixture<AgencyDetailPresentationComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AgencyDetailPresentationComponent,
          MockComponent(DynamicFormComponent),
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AgencyDetailPresentationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
