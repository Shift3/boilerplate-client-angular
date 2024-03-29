import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { INavigation, Navigation } from '@models/navigation';
import { IUserDTO } from '@models/user';
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  selector: 'app-top-navigation',
  template: `
    <app-top-navigation-presentation
      [isValid]="isValid$ | async"
      [loggedInUser]="loggedInUser$ | async"
      [navLinks]="navLinks$ | async"
    ></app-top-navigation-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavigationSmartComponent implements OnInit {
  public isValid$: Observable<boolean>;
  public loggedInUser$: Observable<IUserDTO>;
  public navLinks$: Observable<INavigation[]>;

  constructor(private userStateService: UserStateService) {}

  public ngOnInit(): void {
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
