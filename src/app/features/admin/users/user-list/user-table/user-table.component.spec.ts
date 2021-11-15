import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { UserTableComponent } from './user-table.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserTableComponent', () => {
      let component: UserTableComponent;
      let fixture: ComponentFixture<UserTableComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [UserTableComponent],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(UserTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
