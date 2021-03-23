import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockPipe } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { LocaleUpperCasePipe } from '@shared/pipes/locale-upper-case.pipe';
import { Logger } from '@utils/logger';
import { UserListPresentationComponent } from './user-list-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserListPresentationComponent', () => {
      let component: UserListPresentationComponent;
      let fixture: ComponentFixture<UserListPresentationComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            UserListPresentationComponent,
            MockPipe(LocaleUpperCasePipe),
          ],
          imports: [RouterTestingModule],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(UserListPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
