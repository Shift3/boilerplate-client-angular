import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { AgentListPresentationComponent } from './agent-list-presentation.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { AgentTableComponent } from '../agent-table/agent-table.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgentListPresentationComponent', () => {
      let component: AgentListPresentationComponent;
      let fixture: ComponentFixture<AgentListPresentationComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              AgentListPresentationComponent,
              MockComponent(AgentTableComponent),
            ],
            imports: [RouterTestingModule],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(AgentListPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
