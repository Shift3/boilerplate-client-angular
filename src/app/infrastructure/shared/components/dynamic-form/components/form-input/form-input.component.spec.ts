import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { FormErrorPipe } from '@shared/pipes/form-error.pipe';

import { environment } from '@env/environment.test';
import { FormInputComponent } from './form-input.component';
import { Logger } from '@utils/logger';
import { MockPipe } from 'ng-mocks';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] FormInputComponent', () => {
    let component: FormInputComponent;
    let fixture: ComponentFixture<FormInputComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          FormInputComponent,
          MockPipe(FormErrorPipe),
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(FormInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
