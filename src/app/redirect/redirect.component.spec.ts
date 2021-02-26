import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { RedirectComponent } from './redirect.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] RedirectComponent', () => {
      let component: RedirectComponent;
      let fixture: ComponentFixture<RedirectComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [RedirectComponent],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(RedirectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
