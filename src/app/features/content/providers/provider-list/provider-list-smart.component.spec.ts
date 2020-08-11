import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { ProviderListPresentationComponent } from './provider-list-presentation.component';
import { ProviderListSmartComponent } from './provider-list-smart.component';

!environment.testIntegration
  ? Logger.log('Integration skipped')
  : describe('[Integration] ProviderListSmartComponent', () => {
    let component: ProviderListSmartComponent;
    let fixture: ComponentFixture<ProviderListSmartComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProviderListPresentationComponent,
          ProviderListSmartComponent,
        ],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProviderListSmartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
