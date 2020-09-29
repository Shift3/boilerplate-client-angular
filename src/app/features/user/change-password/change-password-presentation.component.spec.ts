import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ChangePasswordPresentationComponent } from './change-password-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ChangePasswordPresentationComponent', () => {
    let component: ChangePasswordPresentationComponent;
    let fixture: ComponentFixture<ChangePasswordPresentationComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ChangePasswordPresentationComponent,
          MockComponent(DynamicFormComponent),
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ChangePasswordPresentationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
