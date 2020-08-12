import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivateAccountPresentationComponent } from './activate-account-presentation.component';
import { ActivateAccountSmartComponent } from './activate-account-smart.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ActivateAccountSmartComponent', () => {
    let component: ActivateAccountSmartComponent;
    let fixture: ComponentFixture<ActivateAccountSmartComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ActivateAccountPresentationComponent,
          ActivateAccountSmartComponent,
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
      fixture = TestBed.createComponent(ActivateAccountSmartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
