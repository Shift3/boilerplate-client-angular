import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { AgentListPresentationComponent } from './agent-list-presentation.component';
import { AgentListSmartComponent } from './agent-list-smart.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgentListSmartComponent', () => {
    let component: AgentListSmartComponent;
    let fixture: ComponentFixture<AgentListSmartComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AgentListPresentationComponent,
          AgentListSmartComponent,
        ],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AgentListSmartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
