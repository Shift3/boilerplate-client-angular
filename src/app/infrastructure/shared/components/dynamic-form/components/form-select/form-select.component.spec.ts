import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockPipe } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { FormErrorPipe } from '@shared/pipes/form-error.pipe';
import { FormField } from '@models/form/form';
import { FormSelectComponent } from './form-select.component';
import { Logger } from '@utils/logger';
import { ISelectField, SelectField } from '@models/form/select';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] FormSelectComponent', () => {
      let component: FormSelectComponent;
      let fixture: ComponentFixture<FormSelectComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [FormSelectComponent, MockPipe(FormErrorPipe)],
            imports: [ReactiveFormsModule],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(FormSelectComponent);
        component = fixture.componentInstance;
        const formControlName = 'testControl';
        component.config = new FormField<ISelectField<unknown>>({
          name: formControlName,
          fieldConfig: new SelectField(),
        });
        component.group.addControl(formControlName, new FormControl());
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
