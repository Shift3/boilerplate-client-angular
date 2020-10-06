import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ForgotPasswordPresentationComponent } from './forgot-password-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ForgotPasswordPresentationComponent', () => {
      let component: ForgotPasswordPresentationComponent;
      let fixture: ComponentFixture<ForgotPasswordPresentationComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            ForgotPasswordPresentationComponent,
            MockComponent(DynamicFormComponent),
          ],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
