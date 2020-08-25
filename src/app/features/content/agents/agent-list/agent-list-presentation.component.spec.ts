import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { AgentListPresentationComponent } from './agent-list-presentation.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgentListPresentationComponent', () => {
    let component: AgentListPresentationComponent;
    let fixture: ComponentFixture<AgentListPresentationComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AgentListPresentationComponent,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AgentListPresentationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
