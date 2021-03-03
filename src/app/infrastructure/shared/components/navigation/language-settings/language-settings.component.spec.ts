import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { LanguageSettingsComponent } from './language-settings.component';
describe('LanguageSettingsComponent', () => {
  let component: LanguageSettingsComponent;
  let fixture: ComponentFixture<LanguageSettingsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSettingsComponent],
      imports: [TranslocoTestingModule],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
