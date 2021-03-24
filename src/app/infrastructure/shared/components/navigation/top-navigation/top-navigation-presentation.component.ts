import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import {
  IDynamicFormAction,
  DynamicFormAction,
} from '@models/translation/dynamic-form/action';
import { INavigation } from '@models/navigation';
import { IUserDTO, UserDTO } from '@models/user';
import {
  INavLinksTranslationKey,
  NavLinksTranslationKey,
} from '@app/infrastructure/models/translation/navigation';

export interface IActions {
  createAccount: string;
  login: string;
}

@Component({
  selector: 'app-top-navigation-presentation',
  templateUrl: './top-navigation-presentation.component.html',
  styleUrls: ['./top-navigation-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavigationPresentationComponent {
  @Input() public activeLangIsDefaultLang: boolean = true;
  @Input() public isValid: boolean = false;
  @Input() public loggedInUser: IUserDTO = new UserDTO();
  @Input() public navLinks: INavigation[];

  private dynamicFormAction: IDynamicFormAction = new DynamicFormAction();
  public actions: IActions = {
    createAccount: this.dynamicFormAction.createAccount,
    login: this.dynamicFormAction.login,
  };
  public isMenuCollapsed = true;
  public navLinksTranslationKey: INavLinksTranslationKey = new NavLinksTranslationKey();
}
