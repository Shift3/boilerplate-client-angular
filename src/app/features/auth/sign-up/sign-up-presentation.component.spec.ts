import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SignUpPresentationComponent } from './sign-up-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] SignUpPresentationComponent', () => {
    let component: SignUpPresentationComponent;
    let fixture: ComponentFixture<SignUpPresentationComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SignUpPresentationComponent,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SignUpPresentationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
