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
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  selector: 'app-side-navigation',
  template: `
  <app-side-navigation-presentation
    [isLoggedInUser]="(isLoggedInUser$ | async)"
    [navLinks]="(navLinks$ | async)"
  ></app-side-navigation-presentation>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationSmartComponent implements OnInit {
  public isLoggedInUser$: Observable<boolean>;
  public navLinks$: Observable<INavigation[]>;

  constructor(
    private userStateService: UserStateService,
  ) { }

  public ngOnInit(): void {
    this.navLinks$ = this.buildNavLinkListBasedOnRole();
    this.isLoggedInUser$ = this.isLoggedInUser();
  }

  public buildNavLinkListBasedOnRole(): Observable<INavigation[]> {
    return this.userStateService.isAdmin()
      .pipe(map((isAdmin) => Navigation.buildNavLinkList(isAdmin)));
  }

  public isLoggedInUser(): Observable<boolean> {
    return this.userStateService.isLoggedInUser();
  }
}