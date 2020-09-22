import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SideNavigationSmartComponent } from './side-navigation-smart.component';
import { SideNavigationPresentationComponent } from './side-navigation-presentation.component';

describe('SideNavigationSmartComponent', () => {
  let component: SideNavigationSmartComponent;
  let fixture: ComponentFixture<SideNavigationSmartComponent>;

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
    fixture = TestBed.createComponent(SideNavigationSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
