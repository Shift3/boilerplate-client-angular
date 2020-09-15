import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { AgencyListPresentationComponent } from './agency-list-presentation.component';
import { environment } from '@env/environment.test';
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
        ],
      })
      .compileComponents();
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
