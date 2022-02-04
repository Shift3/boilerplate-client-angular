import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { ChangeEmailPresentationComponent } from './change-email-presentation.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ChangeEmailPresentationComponent', () => {
      let component: ChangeEmailPresentationComponent;
      let fixture: ComponentFixture<ChangeEmailPresentationComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [
            ChangeEmailPresentationComponent,
            MockComponent(DynamicFormComponent),
          ]
        })
        .compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(ChangeEmailPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
