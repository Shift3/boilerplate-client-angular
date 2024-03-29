import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockPipe } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SettingsComponent } from './settings.component';
import { TrackByKeyPipe } from '@shared/pipes/track-by-key.pipe';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] SettingsComponent', () => {
      let component: SettingsComponent;
      let fixture: ComponentFixture<SettingsComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [SettingsComponent, MockPipe(TrackByKeyPipe)],
            imports: [HttpClientTestingModule, RouterTestingModule],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
