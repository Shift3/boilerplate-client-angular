import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SignUpPresentationComponent } from './sign-up-presentation.component';
import { SignUpSmartComponent } from './sign-up-smart.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] SignUpSmartComponent', () => {
    let component: SignUpSmartComponent;
    let fixture: ComponentFixture<SignUpSmartComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SignUpPresentationComponent,
          SignUpSmartComponent,
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
      fixture = TestBed.createComponent(SignUpSmartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });