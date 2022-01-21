import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SideNavigationPresentationComponent } from './side-navigation-presentation.component';
import { SettingsComponent } from '../settings/settings.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] SideNavigationPresentationComponent', () => {
      let component: SideNavigationPresentationComponent;
      let fixture: ComponentFixture<SideNavigationPresentationComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              SideNavigationPresentationComponent,
              MockComponent(SettingsComponent),
            ],
            imports: [RouterTestingModule],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
