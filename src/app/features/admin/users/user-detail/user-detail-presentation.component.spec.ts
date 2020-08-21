import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { UserDetailPresentationComponent } from './user-detail-presentation.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserDetailPresentationComponent', () => {
    let component: UserDetailPresentationComponent;
    let fixture: ComponentFixture<UserDetailPresentationComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          UserDetailPresentationComponent,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserDetailPresentationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
