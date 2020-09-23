import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { MockComponent } from 'ng-mocks';

import { DynamicFormComponent } from './dynamic-form.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SaveCancelComponent } from '../save-cancel/save-cancel.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] DynamicFormComponent', () => {
    let component: DynamicFormComponent;
    let fixture: ComponentFixture<DynamicFormComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          DynamicFormComponent,
          MockComponent(SaveCancelComponent),
        ],
        imports: [
          HttpClientTestingModule,
          ReactiveFormsModule,
          RouterTestingModule,
        ],
        providers: [
          FormBuilder,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DynamicFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
