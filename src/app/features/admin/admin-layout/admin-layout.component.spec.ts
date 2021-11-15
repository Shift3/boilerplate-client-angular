import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminLayoutComponent } from './admin-layout.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SideNavigationSmartComponent } from '@shared/components/navigation/side-navigation/side-navigation-smart.component';
import { TopNavigationSmartComponent } from '@shared/components/navigation/top-navigation/top-navigation-smart.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AdminLayoutComponent', () => {
      let component: AdminLayoutComponent;
      let fixture: ComponentFixture<AdminLayoutComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              AdminLayoutComponent,
              SideNavigationSmartComponent,
              TopNavigationSmartComponent,
            ],
            imports: [RouterTestingModule],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(AdminLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
