import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { LogoutComponent } from './logout.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] LogoutComponent', () => {
      let component: LogoutComponent;
      let fixture: ComponentFixture<LogoutComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [LogoutComponent],
          imports: [RouterTestingModule],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(LogoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
