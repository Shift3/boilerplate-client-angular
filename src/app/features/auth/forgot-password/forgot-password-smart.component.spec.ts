import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { ForgotPasswordPresentationComponent } from './forgot-password-presentation.component';
import { ForgotPasswordSmartComponent } from './forgot-password-smart.component';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ForgotPasswordSmartComponent', () => {
      let component: ForgotPasswordSmartComponent;
      let fixture: ComponentFixture<ForgotPasswordSmartComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              ForgotPasswordSmartComponent,
              MockComponent(ForgotPasswordPresentationComponent),
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
        fixture = TestBed.createComponent(ForgotPasswordSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
