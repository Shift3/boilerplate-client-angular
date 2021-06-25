import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockComponent } from 'ng-mocks';

import { LanguageSettingsPresentationComponent } from './language-settings-presentation.component';
import { LanguageSettingsSmartComponent } from './language-settings-smart.component';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';

import { TranslocoTestingModule } from '@ngneat/transloco';

describe('LanguageSettingsSmartComponent', () => {
  let component: LanguageSettingsSmartComponent;
  let fixture: ComponentFixture<LanguageSettingsSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LanguageSettingsSmartComponent,
        MockComponent(LanguageSettingsPresentationComponent),
      ],
      imports: [
        HttpClientTestingModule,
        ToastrTestingModule,
        TranslocoTestingModule,
      ],
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
