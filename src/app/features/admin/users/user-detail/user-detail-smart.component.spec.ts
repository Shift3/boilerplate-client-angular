import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { UserDetailPresentationComponent } from './user-detail-presentation.component';
import { UserDetailSmartComponent } from './user-detail-smart.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] UserDetailSmartComponent', () => {
      let component: UserDetailSmartComponent;
      let fixture: ComponentFixture<UserDetailSmartComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            UserDetailSmartComponent,
            MockComponent(UserDetailPresentationComponent),
          ],
          imports: [
            HttpClientTestingModule,
            ReactiveFormsModule,
            RouterTestingModule,
            ToastrTestingModule,
            TranslocoTestingModule,
          ],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
