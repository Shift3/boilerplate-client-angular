import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminLayoutComponent } from './admin-layout.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SideNavigationComponent } from '@shared/components/navigation/side-navigation/side-navigation.component';
import { TopNavigationComponent } from '@shared/components/navigation/top-navigation/top-navigation.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AdminLayoutComponent', () => {
    let component: AdminLayoutComponent;
    let fixture: ComponentFixture<AdminLayoutComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AdminLayoutComponent,
          SideNavigationComponent,
          TopNavigationComponent,
        ],
        imports: [ RouterTestingModule ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AdminLayoutComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
