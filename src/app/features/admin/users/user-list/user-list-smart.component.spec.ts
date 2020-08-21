import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { UserListPresentationComponent } from './user-list-presentation.component';
import { UserListSmartComponent } from './user-list-smart.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserListSmartComponent', () => {
    let component: UserListSmartComponent;
    let fixture: ComponentFixture<UserListSmartComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          UserListPresentationComponent,
          UserListSmartComponent,
        ],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserListSmartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
