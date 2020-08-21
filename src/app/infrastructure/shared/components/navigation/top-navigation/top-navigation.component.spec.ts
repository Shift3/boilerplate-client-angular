import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TopNavigationSmartComponent } from './top-navigation-smart.component';

describe('TopNavigationSmartComponent', () => {
  let component: TopNavigationSmartComponent;
  let fixture: ComponentFixture<TopNavigationSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavigationSmartComponent ],
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
