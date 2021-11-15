import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ActivateAccountPresentationComponent } from './activate-account-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ActivateAccountPresentationComponent', () => {
      let component: ActivateAccountPresentationComponent;
      let fixture: ComponentFixture<ActivateAccountPresentationComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              ActivateAccountPresentationComponent,
              MockComponent(DynamicFormComponent),
            ],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(ActivateAccountPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
