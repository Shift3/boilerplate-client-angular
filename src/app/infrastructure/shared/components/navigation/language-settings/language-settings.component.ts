import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { LANGUAGE } from '@models/enums';

@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.component.html',
  styleUrls: ['./language-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSettingsComponent implements OnInit {
  public availableLanguages;
  public activeLanguage: string = 'English';

  constructor() {}

  ngOnInit(): void {
    this.availableLanguages = Object.values(LANGUAGE).sort();
  }

  public selectLanguage(language: string): void {}
}
