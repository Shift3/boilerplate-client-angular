import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ChangePasswordPresentationComponent } from './change-password-presentation.component';
import { ChangePasswordSmartComponent } from './change-password-smart.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ChangePasswordSmartComponent', () => {
    let component: ChangePasswordSmartComponent;
    let fixture: ComponentFixture<ChangePasswordSmartComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ChangePasswordPresentationComponent,
          ChangePasswordSmartComponent,
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
      fixture = TestBed.createComponent(ChangePasswordSmartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
