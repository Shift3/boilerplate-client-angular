import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent, MockPipe } from 'ng-mocks';

import { AgentListPresentationComponent } from './agent-list-presentation.component';
import { environment } from '@env/environment.test';
import { LocaleUpperCasePipe } from '@shared/pipes/locale-upper-case.pipe';
import { Logger } from '@utils/logger';
import { AgentTableComponent } from '../agent-table/agent-table.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgentListPresentationComponent', () => {
      let component: AgentListPresentationComponent;
      let fixture: ComponentFixture<AgentListPresentationComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            AgentListPresentationComponent,
            MockComponent(AgentTableComponent),
            MockPipe(LocaleUpperCasePipe),
          ],
          imports: [RouterTestingModule],
        }).compileComponents();
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
