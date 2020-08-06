import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SideNavigationSmartComponent } from './side-navigation-smart.component';
import { SideNavigationPresentationComponent } from './side-navigation-presentation.component';

describe('SideNavigationPresentationComponent', () => {
  let component: SideNavigationPresentationComponent;
  let fixture: ComponentFixture<SideNavigationPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SideNavigationPresentationComponent,
        SideNavigationSmartComponent,
      ],
      imports: [
        HttpClientTestingModule,
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
