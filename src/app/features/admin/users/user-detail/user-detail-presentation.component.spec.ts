import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { UserDetailPresentationComponent } from './user-detail-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserDetailPresentationComponent', () => {
      let component: UserDetailPresentationComponent;
      let fixture: ComponentFixture<UserDetailPresentationComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              UserDetailPresentationComponent,
              MockComponent(DynamicFormComponent),
            ],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
