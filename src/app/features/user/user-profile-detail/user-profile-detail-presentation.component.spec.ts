import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDetailPresentationComponent } from './user-profile-detail-presentation.component';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserProfileDetailPresentationComponent', () => {
      let component: UserProfileDetailPresentationComponent;
      let fixture: ComponentFixture<UserProfileDetailPresentationComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [ UserProfileDetailPresentationComponent ]
        })
        .compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileDetailPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
