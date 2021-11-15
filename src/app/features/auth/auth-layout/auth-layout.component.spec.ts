import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthLayoutComponent } from './auth-layout.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AuthLayoutComponent', () => {
      let component: AuthLayoutComponent;
      let fixture: ComponentFixture<AuthLayoutComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [AuthLayoutComponent],
            imports: [RouterTestingModule],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(AuthLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
