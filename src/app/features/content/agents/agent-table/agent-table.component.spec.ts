import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { AgentTableComponent } from './agent-table.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgentTableComponent', () => {
    let component: AgentTableComponent;
    let fixture: ComponentFixture<AgentTableComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AgentTableComponent,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AgentTableComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
