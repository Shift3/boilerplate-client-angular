import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailPresentationComponent } from './change-email-presentation.component';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('ChangeEmailPresentationComponent', () => {
      let component: ChangeEmailPresentationComponent;
      let fixture: ComponentFixture<ChangeEmailPresentationComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [ ChangeEmailPresentationComponent ]
        })
        .compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(ChangeEmailPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
