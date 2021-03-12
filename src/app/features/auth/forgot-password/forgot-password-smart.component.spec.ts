import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';
import { TranslocoTestingModule } from '@ngneat/transloco';

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

      beforeEach(async(() => {
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
            TranslocoTestingModule,
          ],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
