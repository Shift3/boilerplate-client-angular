import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { LanguageStateService } from '@app/infrastructure/core/services/state/language-state.service';

@Component({
  selector: 'app-language-settings',
  template: `
    <app-language-settings-presentation
      [activeLanguage]="activeLanguage$ | async"
      [availableLanguagesForSelection]="availableLanguagesForSelection$ | async"
      (emitSelection)="selectLanguage($event)"
    ></app-language-settings-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSettingsSmartComponent implements OnInit {
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
