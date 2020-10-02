import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ContentLayoutComponent } from './content-layout.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ContentLayoutComponent', () => {
      let component: ContentLayoutComponent;
      let fixture: ComponentFixture<ContentLayoutComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ContentLayoutComponent],
          imports: [RouterTestingModule],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(ContentLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
