import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from 'ng-mocks';

import { AgentTableComponent } from './agent-table.component';
import { environment } from '@env/environment.test';
import { LocaleUpperCasePipe } from '@shared/pipes/locale-upper-case.pipe';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgentTableComponent', () => {
      let component: AgentTableComponent;
      let fixture: ComponentFixture<AgentTableComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [AgentTableComponent, MockPipe(LocaleUpperCasePipe)],
        }).compileComponents();
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
