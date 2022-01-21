import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { environment } from '@env/environment.test';
import { FooterComponent } from './footer.component';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] FooterComponent', () => {
      let component: FooterComponent;
      let fixture: ComponentFixture<FooterComponent>;

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            declarations: [FooterComponent],
          }).compileComponents();
        }),
      );

      beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
