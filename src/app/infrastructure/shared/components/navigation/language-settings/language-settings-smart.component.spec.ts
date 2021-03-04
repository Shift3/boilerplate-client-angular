import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { TranslocoTestingModule } from '@ngneat/transloco';

import { LanguageSettingsPresentationComponent } from './language-settings-presentation.component';
import { LanguageSettingsSmartComponent } from './language-settings-smart.component';

describe('LanguageSettingsSmartComponent', () => {
  let component: LanguageSettingsSmartComponent;
  let fixture: ComponentFixture<LanguageSettingsSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LanguageSettingsSmartComponent,
        MockComponent(LanguageSettingsPresentationComponent),
      ],
      imports: [TranslocoTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSettingsSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
