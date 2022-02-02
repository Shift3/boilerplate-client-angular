import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { ChangeEmailPresentationComponent } from './change-email-presentation.component';
import { ChangeEmailSmartComponent } from './change-email-smart.component';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('ChangeEmailSmartComponent', () => {
      let component: ChangeEmailSmartComponent;
      let fixture: ComponentFixture<ChangeEmailSmartComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [
            ChangeEmailSmartComponent,
            MockComponent(ChangeEmailPresentationComponent),
          ]
        })
        .compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(ChangeEmailSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
