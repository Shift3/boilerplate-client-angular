import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ResetPasswordPresentationComponent } from './reset-password-presentation.component';
import { ResetPasswordSmartComponent } from './reset-password-smart.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ResetPasswordSmartComponent', () => {
    let component: ResetPasswordSmartComponent;
    let fixture: ComponentFixture<ResetPasswordSmartComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ResetPasswordPresentationComponent,
          ResetPasswordSmartComponent,
        ],
        imports: [
          HttpClientTestingModule,
          ReactiveFormsModule,
          RouterTestingModule,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ResetPasswordSmartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });