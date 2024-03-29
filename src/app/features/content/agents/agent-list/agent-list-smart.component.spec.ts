import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { AgentListPresentationComponent } from './agent-list-presentation.component';
import { AgentListSmartComponent } from './agent-list-smart.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AgentListSmartComponent', () => {
      let component: AgentListSmartComponent;
      let fixture: ComponentFixture<AgentListSmartComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              AgentListSmartComponent,
              MockComponent(AgentListPresentationComponent),
            ],
            imports: [
              HttpClientTestingModule,
              RouterTestingModule,
              ToastrTestingModule,
            ],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(AgentListSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
