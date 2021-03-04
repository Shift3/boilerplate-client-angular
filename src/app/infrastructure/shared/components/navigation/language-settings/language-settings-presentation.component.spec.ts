import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslocoTestingModule } from '@ngneat/transloco';

import { LanguageSettingsPresentationComponent } from './language-settings-presentation.component';

describe('LanguageSettingsPresentationComponent', () => {
  let component: LanguageSettingsPresentationComponent;
  let fixture: ComponentFixture<LanguageSettingsPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSettingsPresentationComponent],
      imports: [TranslocoTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSettingsPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
