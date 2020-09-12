import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ChangePasswordPresentationComponent } from './change-password-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ChangePasswordPresentationComponent', () => {
    let component: ChangePasswordPresentationComponent;
    let fixture: ComponentFixture<ChangePasswordPresentationComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ChangePasswordPresentationComponent,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ChangePasswordPresentationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
