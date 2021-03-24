import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import {
  IDynamicFormAction,
  DynamicFormAction,
} from '@models/translation/dynamic-form/action';
import { INavigation } from '@models/navigation';
import {
  INavLinksTranslationKey,
  NavLinksTranslationKey,
} from '@models/translation/navigation';
import { IUserDTO, UserDTO } from '@models/user';

export interface IActions {
  login: string;
  signUp: string;
}

@Component({
  selector: 'app-side-navigation-presentation',
  templateUrl: './side-navigation-presentation.component.html',
  styleUrls: ['./side-navigation-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationPresentationComponent {
  @Input() public activeLangIsDefaultLang: boolean = true;
  @Input() public isValid: boolean = false;
  @Input() public loggedInUser: IUserDTO = new UserDTO();
  @Input() public navLinks: INavigation[];

  private dynamicFormAction: IDynamicFormAction = new DynamicFormAction();
  public actions: IActions = {
    login: this.dynamicFormAction.login,
    signUp: this.dynamicFormAction.signUp,
  };
  public isMenuCollapsed = true;
  public navLinksTranslationKey: INavLinksTranslationKey = new NavLinksTranslationKey();
}
