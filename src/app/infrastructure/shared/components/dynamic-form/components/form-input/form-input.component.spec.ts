import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockPipe } from 'ng-mocks';
import { NgxMaskModule } from 'ngx-mask';

import { environment } from '@env/environment.test';
import { FormErrorPipe } from '@shared/pipes/form-error.pipe';
import { FormField } from '@models/form/form';
import { FormInputComponent } from './form-input.component';
import { IInputField, InputField } from '@models/form/input';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] FormInputComponent', () => {
      let component: FormInputComponent;
      let fixture: ComponentFixture<FormInputComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [FormInputComponent, MockPipe(FormErrorPipe)],
            imports: [NgxMaskModule.forRoot(), ReactiveFormsModule],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(FormInputComponent);
        component = fixture.componentInstance;
        const formControlName = 'testControl';
        component.config = new FormField<IInputField>({
          name: formControlName,
          fieldConfig: new InputField(),
        });
        component.group.addControl(formControlName, new FormControl());
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
