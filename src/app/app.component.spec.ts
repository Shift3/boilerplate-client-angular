import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { AppComponent } from './app.component';
import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { SideNavigationSmartComponent } from '@shared/components/navigation/side-navigation/side-navigation-smart.component';
import { TopNavigationSmartComponent } from '@shared/components/navigation/top-navigation/top-navigation-smart.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] AppComponent', () => {
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule, TranslocoTestingModule],
          declarations: [
            AppComponent,
            MockComponent(FooterComponent),
            MockComponent(SideNavigationSmartComponent),
            MockComponent(TopNavigationSmartComponent),
          ],
        }).compileComponents();
      }));

      it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });

      it(`should have as title 'boilerplate-client-angular'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const app = fixture.componentInstance;
        expect(app.title).toEqual('boilerplate-client-angular');
      });
    });
