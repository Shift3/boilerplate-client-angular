import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { ConfirmChangeEmailPresentationComponent } from './confirm-change-email-presentation.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('ConfirmChangeEmailPresentationComponent', () => {
      let component: ConfirmChangeEmailPresentationComponent;
      let fixture: ComponentFixture<ConfirmChangeEmailPresentationComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [
            ConfirmChangeEmailPresentationComponent,
            MockComponent(DynamicFormComponent),
          ]
        })
        .compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmChangeEmailPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
