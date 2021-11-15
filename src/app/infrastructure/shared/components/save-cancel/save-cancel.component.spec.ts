import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SaveCancelComponent } from './save-cancel.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] SaveCancelComponent', () => {
      let component: SaveCancelComponent;
      let fixture: ComponentFixture<SaveCancelComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [SaveCancelComponent],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(SaveCancelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
