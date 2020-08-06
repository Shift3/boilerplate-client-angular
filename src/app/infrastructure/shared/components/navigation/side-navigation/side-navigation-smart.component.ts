import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthStateService } from '@core/services/state/auth-state.service';
import {
  INavigation,
  navLinkList,
} from '@models/navigation';

@Component({
  selector: 'app-side-navigation',
  template: `
  <app-side-navigation-presentation
    [isAdmin]="(isAdmin$ | async)"
    [isLoggedInUser]="(isLoggedInUser$ | async)"
    [navLinks]="(navLinks)"
  ></app-side-navigation-presentation>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationSmartComponent implements OnInit {
  public navLinks: INavigation[] = navLinkList;
  public isAdmin$: Observable<boolean>;
  public isLoggedInUser$: Observable<boolean>;

  constructor(
    private authStateService: AuthStateService,
  ) { }

  public ngOnInit(): void {
    this.isAdmin$ = this.isAdmin();
    this.isLoggedInUser$ = this.isLoggedInUser();
  }

  public isAdmin(): Observable<boolean> {
    return this.authStateService.isAdmin().pipe(
      tap((isAdmin) => {
        this.navLinks = Navigation.buildNavLinkList(isAdmin, this.navLinks);
      }),
    );
  }

  public isLoggedInUser(): Observable<boolean> {
    return this.authStateService.isLoggedInUser();
  }
}
