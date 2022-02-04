import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { ConfirmChangeEmailPresentationComponent } from './confirm-change-email-presentation.component';
import { ConfirmChangeEmailSmartComponent } from './confirm-change-email-smart.component';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ConfirmChangeEmailSmartComponent', () => {
      let component: ConfirmChangeEmailSmartComponent;
      let fixture: ComponentFixture<ConfirmChangeEmailSmartComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [
            ConfirmChangeEmailSmartComponent,
            MockComponent(ConfirmChangeEmailPresentationComponent),
          ],
          imports: [
            HttpClientTestingModule,
            ReactiveFormsModule,
            RouterTestingModule,
            ToastrTestingModule,
          ]
        })
        .compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmChangeEmailSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
