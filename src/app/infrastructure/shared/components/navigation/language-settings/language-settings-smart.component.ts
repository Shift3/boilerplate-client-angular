import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';

import {
  ChangeUserSettingRequest,
  IChangeUserSettingRequest,
  IUserDTO,
  UserDTO,
} from '@app/infrastructure/models/user';
import { LanguageStateService } from '@core/services/state/language-state.service';
import { UserService } from '@core/services/api/user.service';

@Component({
  selector: 'app-language-settings',
  template: `
    <app-language-settings-presentation
      [activeLanguage]="activeLanguage"
      [availableLanguagesForSelection]="availableLanguagesForSelection"
      [activeLangIsDefaultLang]="activeLangIsDefaultLang"
      (emitSelection)="selectLanguage($event)"
    ></app-language-settings-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSettingsSmartComponent implements OnInit {
  @Input() loggedInUser: IUserDTO = new UserDTO();

  public availableLanguagesForSelection: string[];
  public activeLanguage: string;
  public activeLangIsDefaultLang: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    public languageStateService: LanguageStateService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.activeAvailableLanguageSetup();
  }

  private activeAvailableLanguageSetup() {
    this.languageStateService
      .getActiveLanguage()
      .subscribe((activeLanguage: string) => {
        this.activeLanguage = activeLanguage;
        this.cd.markForCheck();
      });

    this.languageStateService
      .getAvailableLanguages()
      .subscribe((availableLanguagesForSelection: string[]) => {
        this.availableLanguagesForSelection = availableLanguagesForSelection;
        this.cd.markForCheck();
      });

    this.languageStateService
      .getActiveLangIsDefaultLang()
      .subscribe((activeLangIsDefaultLang: boolean) => {
        this.activeLangIsDefaultLang = activeLangIsDefaultLang;
        this.cd.markForCheck();
      });
  }

  public selectLanguage(language: string): void {
    if (language?.length) {
      this.languageStateService.selectLanguage(language.split('/')[0]);
      this.setUserSettingLanguage(language);
    }
  }

  private setUserSettingLanguage(language: string): void {
    if (this.loggedInUser?.id) {
      const languageCode: string = this.languageStateService.getLanguageCodeFromLanguage(
        language,
      );
      const userSettingPayload: IChangeUserSettingRequest = new ChangeUserSettingRequest(
        {
          language: languageCode,
        },
      );

      this.userService.updateUserSetting(
        userSettingPayload,
        this.loggedInUser.id,
      );
    }
  }
}
