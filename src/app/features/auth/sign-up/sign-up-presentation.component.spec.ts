import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SignUpPresentationComponent } from './sign-up-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] SignUpPresentationComponent', () => {
      let component: SignUpPresentationComponent;
      let fixture: ComponentFixture<SignUpPresentationComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              SignUpPresentationComponent,
              MockComponent(DynamicFormComponent),
            ],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(SignUpPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
