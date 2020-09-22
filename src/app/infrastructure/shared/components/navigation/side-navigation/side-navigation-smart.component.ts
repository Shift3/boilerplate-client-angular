import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  INavigation,
  Navigation,
} from '@models/navigation';
import { IUserDTO } from '@models/user';
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  selector: 'app-side-navigation',
  template: `
  <app-side-navigation-presentation
    [isAuthenticated]="(isAuthenticated$ | async)"
    [loggedInUser]="(loggedInUser$ | async)"
    [navLinks]="(navLinks$ | async)"
  ></app-side-navigation-presentation>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationSmartComponent implements OnInit {
  public isAuthenticated$: Observable<boolean>;
  public loggedInUser$: Observable<IUserDTO>;
  public navLinks$: Observable<INavigation[]>;

  constructor(
    private userStateService: UserStateService,
  ) { }

  public ngOnInit(): void {
    this.isAuthenticated$ = this.isAuthenticated();
    this.loggedInUser$ = this.getLoggedInUser();
    this.navLinks$ = this.buildNavLinkListBasedOnRole();
  }

  public buildNavLinkListBasedOnRole(): Observable<INavigation[]> {
    return this.userStateService.checkRoleList()
      .pipe(map((roleList) => Navigation.buildNavLinkList(roleList)));
  }

  public getLoggedInUser(): Observable<IUserDTO> {
    return this.userStateService.getUserSession();
  }

  public isAuthenticated(): Observable<boolean> {
    return this.userStateService.checkRoleList()
      .pipe(map((checkRole) => checkRole.isAuthenticated));
  }
}
