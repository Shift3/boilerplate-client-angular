import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { LanguageStateService } from '@app/infrastructure/core/services/state/language-state.service';

@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.component.html',
  styleUrls: ['./language-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSettingsComponent implements OnInit {
  public availableLanguagesForSelection$: Observable<string[]>;
  public activeLanguage$: Observable<string>;

  constructor(public languageStateService: LanguageStateService) {}

  ngOnInit(): void {
    this.activeLanguage$ = this.languageStateService.getActiveLanguage();
    this.availableLanguagesForSelection$ = this.languageStateService.getAvailableLanguages();
  }

  public selectLanguage(language: string): void {
    this.languageStateService.selectLanguage(language);
  }
}
