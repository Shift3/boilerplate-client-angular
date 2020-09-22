import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { SideNavigationPresentationComponent } from './side-navigation-presentation.component';
import { SettingsComponent } from '../settings/settings.component';

describe('SideNavigationPresentationComponent', () => {
  let component: SideNavigationPresentationComponent;
  let fixture: ComponentFixture<SideNavigationPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SideNavigationPresentationComponent,
        MockComponent(SettingsComponent),
      ],
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavigationPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
