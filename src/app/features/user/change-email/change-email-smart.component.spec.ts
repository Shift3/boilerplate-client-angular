import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { ChangeEmailPresentationComponent } from './change-email-presentation.component';
import { ChangeEmailSmartComponent } from './change-email-smart.component';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('ChangeEmailSmartComponent', () => {
      let component: ChangeEmailSmartComponent;
      let fixture: ComponentFixture<ChangeEmailSmartComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [
            ChangeEmailSmartComponent,
            MockComponent(ChangeEmailPresentationComponent),
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
        fixture = TestBed.createComponent(ChangeEmailSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
