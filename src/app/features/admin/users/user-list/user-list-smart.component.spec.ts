import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { UserListPresentationComponent } from './user-list-presentation.component';
import { UserListSmartComponent } from './user-list-smart.component';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserListSmartComponent', () => {
      let component: UserListSmartComponent;
      let fixture: ComponentFixture<UserListSmartComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            UserListSmartComponent,
            MockComponent(UserListPresentationComponent),
          ],
          imports: [
            HttpClientTestingModule,
            RouterTestingModule,
            ToastrTestingModule,
          ],
        }).compileComponents();
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
