import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { FormErrorPipe } from '@shared/pipes/form-error.pipe';

import { environment } from '@env/environment.test';
import { FormSelectComponent } from './form-select.component';
import { Logger } from '@utils/logger';
import { MockPipe } from 'ng-mocks';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] FormSelectComponent', () => {
    let component: FormSelectComponent;
    let fixture: ComponentFixture<FormSelectComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          FormSelectComponent,
          MockPipe(FormErrorPipe),
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(FormSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
