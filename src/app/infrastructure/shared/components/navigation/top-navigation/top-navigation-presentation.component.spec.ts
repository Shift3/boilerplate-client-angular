import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SettingsComponent } from '../settings/settings.component';
import { TopNavigationPresentationComponent } from './top-navigation-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] TopNavigationPresentationComponent', () => {
      let component: TopNavigationPresentationComponent;
      let fixture: ComponentFixture<TopNavigationPresentationComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [
              TopNavigationPresentationComponent,
              MockComponent(SettingsComponent),
            ],
            imports: [RouterTestingModule],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(TopNavigationPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
