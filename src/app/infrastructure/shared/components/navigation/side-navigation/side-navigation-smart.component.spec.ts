import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MockComponent } from 'ng-mocks';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SideNavigationSmartComponent } from './side-navigation-smart.component';
import { SideNavigationPresentationComponent } from './side-navigation-presentation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] SideNavigationSmartComponent', () => {
      let component: SideNavigationSmartComponent;
      let fixture: ComponentFixture<SideNavigationSmartComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            SideNavigationSmartComponent,
            MockComponent(SideNavigationPresentationComponent),
          ],
          imports: [HttpClientTestingModule],
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
