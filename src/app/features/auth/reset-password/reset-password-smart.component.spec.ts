import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ResetPasswordPresentationComponent } from './reset-password-presentation.component';
import { ResetPasswordSmartComponent } from './reset-password-smart.component';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ResetPasswordSmartComponent', () => {
      let component: ResetPasswordSmartComponent;
      let fixture: ComponentFixture<ResetPasswordSmartComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              ResetPasswordSmartComponent,
              MockComponent(ResetPasswordPresentationComponent),
            ],
            imports: [
              HttpClientTestingModule,
              ReactiveFormsModule,
              RouterTestingModule,
              ToastrTestingModule,
            ],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
