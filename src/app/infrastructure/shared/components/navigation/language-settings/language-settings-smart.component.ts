import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IChangeUserSettingRequest } from '@app/infrastructure/models/user-setting';
import { IUserDTO } from '@app/infrastructure/models/user';
import { LanguageStateService } from '@core/services/state/language-state.service';
import { UserSettingService } from '@core/services/api/user-setting.service';
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  selector: 'app-language-settings',
  template: `
    <app-language-settings-presentation
      [activeLanguage]="activeLanguage$ | async"
      [availableLanguagesForSelection]="availableLanguagesForSelection$ | async"
      [activeLangIsDefaultLang]="activeLangIsDefaultLang$ | async"
      (emitSelection)="selectLanguage($event)"
    ></app-language-settings-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSettingsSmartComponent implements OnInit {
  public availableLanguagesForSelection$: Observable<string[]>;
  public activeLanguage$: Observable<string>;
  public activeLangIsDefaultLang$: Observable<boolean>;

  constructor(
    public languageStateService: LanguageStateService,
    private userSettingService: UserSettingService,
    private userStateService: UserStateService,
  ) {}

  ngOnInit(): void {
    this.activeAvailableLanguageSetup();
  }

  private activeAvailableLanguageSetup() {
    this.activeLanguage$ = this.languageStateService.getActiveLanguage();
    this.availableLanguagesForSelection$ = this.languageStateService.getAvailableLanguages();
    this.activeLangIsDefaultLang$ = this.languageStateService.getActiveLangIsDefaultLang();
  }

  public selectLanguage(language: string): void {
    if (language?.length) {
      this.languageStateService.selectLanguage(language.split('/')[0]);
      this.setUserSettingLanguage(language);
    }
  }

  private setUserSettingLanguage(language: string): void {
    const languageCode: string = this.languageStateService.getLanguageCodeFromLanguage(
      language,
    );
    const userSettingPayload: IChangeUserSettingRequest = {
      language: languageCode,
    };

    // Get logged in user to set their preferred language
    this.userStateService.getUserSession().pipe(
      tap((user: IUserDTO) => {
        // Set user-settings in the database
        this.userSettingService.updateUserSetting(userSettingPayload, user.id);
      }),
    );
  }
}
