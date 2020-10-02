import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { AgentDetailPresentationComponent } from './agent-detail-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgentDetailPresentationComponent', () => {
      let component: AgentDetailPresentationComponent;
      let fixture: ComponentFixture<AgentDetailPresentationComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            AgentDetailPresentationComponent,
            MockComponent(DynamicFormComponent),
          ],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(AgentDetailPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
