import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { LocaleUpperCasePipe } from '@shared/pipes/locale-upper-case.pipe';
import { Logger } from '@utils/logger';
import { UserTableComponent } from './user-table.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserTableComponent', () => {
      let component: UserTableComponent;
      let fixture: ComponentFixture<UserTableComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [UserTableComponent, MockPipe(LocaleUpperCasePipe)],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(UserTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
