import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng-mocks';

import { TopNavigationSmartComponent } from './top-navigation-smart.component';
import { TopNavigationPresentationComponent } from './top-navigation-presentation.component';

describe('TopNavigationSmartComponent', () => {
  let component: TopNavigationSmartComponent;
  let fixture: ComponentFixture<TopNavigationSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopNavigationSmartComponent,
        MockComponent(TopNavigationPresentationComponent),
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavigationSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
