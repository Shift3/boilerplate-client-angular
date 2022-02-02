import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { UserProfileDetailPresentationComponent } from './user-profile-detail-presentation.component';
import { UserProfileDetailSmartComponent } from './user-profile-detail-smart.component';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserProfileDetailSmartComponent', () => {
      let component: UserProfileDetailSmartComponent;
      let fixture: ComponentFixture<UserProfileDetailSmartComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [
            UserProfileDetailSmartComponent,
            MockComponent(UserProfileDetailPresentationComponent),
          ]
        })
        .compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileDetailSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
