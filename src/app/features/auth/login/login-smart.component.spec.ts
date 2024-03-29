import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { LoginPresentationComponent } from './login-presentation.component';
import { LoginSmartComponent } from './login-smart.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] LoginSmartComponent', () => {
      let component: LoginSmartComponent;
      let fixture: ComponentFixture<LoginSmartComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              LoginSmartComponent,
              MockComponent(LoginPresentationComponent),
            ],
            imports: [
              HttpClientTestingModule,
              ReactiveFormsModule,
              RouterTestingModule,
            ],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(LoginSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
