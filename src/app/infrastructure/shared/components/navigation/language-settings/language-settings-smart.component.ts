import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';

import {
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
      [activeLanguage]="activeLanguage$ | async"
      [availableLanguagesForSelection]="availableLanguagesForSelection$ | async"
      [activeLangIsDefaultLang]="activeLangIsDefaultLang$ | async"
      (emitSelection)="selectLanguage($event)"
    ></app-language-settings-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSettingsSmartComponent implements OnInit {
  @Input() loggedInUser: IUserDTO = new UserDTO();

  public availableLanguagesForSelection$: Observable<string[]>;
  public activeLanguage$: Observable<string>;
  public activeLangIsDefaultLang$: Observable<boolean>;

  constructor(
    public languageStateService: LanguageStateService,
    private userService: UserService,
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
    if (this.loggedInUser?.id) {
      const languageCode: string = this.languageStateService.getLanguageCodeFromLanguage(
        language,
      );
      const userSettingPayload: IChangeUserSettingRequest = {
        language: languageCode,
      };

      this.userService.updateUserSetting(
        userSettingPayload,
        this.loggedInUser.id,
      );
    }
  }
}
