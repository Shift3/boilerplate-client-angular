import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { ChangeEmailSmartComponent } from '@features/user/change-email/change-email-smart.component';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileDetailSmartComponent } from '@features/user/user-profile-detail/user-profile-detail-smart.component';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';


!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserProfileComponent', () => {
      let component: UserProfileComponent;
      let fixture: ComponentFixture<UserProfileComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [
            UserProfileComponent,
            MockComponent(UserProfileDetailSmartComponent),
            MockComponent(ChangeEmailSmartComponent),
          ]
        })
        .compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
