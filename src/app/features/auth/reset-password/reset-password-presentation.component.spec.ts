import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ResetPasswordPresentationComponent } from './reset-password-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ResetPasswordPresentationComponent', () => {
    let component: ResetPasswordPresentationComponent;
    let fixture: ComponentFixture<ResetPasswordPresentationComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ResetPasswordPresentationComponent,
          MockComponent(DynamicFormComponent),
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ResetPasswordPresentationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
