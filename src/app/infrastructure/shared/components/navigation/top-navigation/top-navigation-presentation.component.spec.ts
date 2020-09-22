import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { TopNavigationPresentationComponent } from './top-navigation-presentation.component';
import { SettingsComponent } from '../settings/settings.component';

describe('TopNavigationPresentationComponent', () => {
  let component: TopNavigationPresentationComponent;
  let fixture: ComponentFixture<TopNavigationPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopNavigationPresentationComponent,
        MockComponent(SettingsComponent),
      ],
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavigationPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
