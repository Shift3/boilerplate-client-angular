import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { INavigation, Navigation } from '@models/navigation';
import { IUserDTO } from '@models/user';
import { LanguageStateService } from '@core/services/state/language-state.service';
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  selector: 'app-side-navigation',
  template: `
    <app-side-navigation-presentation
      [activeLangIsDefaultLang]="activeLangIsDefaultLang$ | async"
      [isValid]="isValid$ | async"
      [loggedInUser]="loggedInUser$ | async"
      [navLinks]="navLinks$ | async"
    ></app-side-navigation-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationSmartComponent implements OnInit {
  public activeLangIsDefaultLang$: Observable<boolean>;
  public isValid$: Observable<boolean>;
  public loggedInUser$: Observable<IUserDTO>;
  public navLinks$: Observable<INavigation[]>;

  constructor(
    public languageStateService: LanguageStateService,
    private userStateService: UserStateService,
  ) {}

  public ngOnInit(): void {
    this.activeLangIsDefaultLang$ = this.languageStateService.getActiveLangIsDefaultLang();
    this.isValid$ = this.isValid();
    this.loggedInUser$ = this.getLoggedInUser();
    this.navLinks$ = this.buildNavLinkListBasedOnRole();
  }

  public buildNavLinkListBasedOnRole(): Observable<INavigation[]> {
    return this.userStateService
      .checkRoleList()
      .pipe(map((roleList) => Navigation.buildNavLinkList(roleList)));
  }

  public getLoggedInUser(): Observable<IUserDTO> {
    return this.userStateService.getUserSession();
  }

  public isValid(): Observable<boolean> {
    return this.userStateService
      .checkRoleList()
      .pipe(map((checkRole) => checkRole.isValid));
  }
}
