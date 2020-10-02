import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { NavbarStateService } from '@core/services/state/navbar-state.service';

/**
 * Wrapper component for all `UserModule` routes.
 */
@Component({
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLayoutComponent {
  public navbarToggle$: Observable<string>;

  constructor(private navbarStateService: NavbarStateService) {
    this.navbarToggle$ = this.navbarStateService.getNavbarToggle();
  }
}
