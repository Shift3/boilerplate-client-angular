import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AgencyListPresentationComponent } from './agency-list-presentation.component';
import { AgencyListSmartComponent } from './agency-list-smart.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgencyListSmartComponent', () => {
    let component: AgencyListSmartComponent;
    let fixture: ComponentFixture<AgencyListSmartComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AgencyListPresentationComponent,
          AgencyListSmartComponent,
        ],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AgencyListSmartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
