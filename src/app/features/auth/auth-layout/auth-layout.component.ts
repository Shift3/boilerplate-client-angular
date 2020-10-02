import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { NavbarStateService } from '@core/services/state/navbar-state.service';

/**
 * Wrapper component for all `AuthModule` routes.
 */
@Component({
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  public navbarToggle$: Observable<string>;
  constructor(private navbarStateService: NavbarStateService) {
    this.navbarToggle$ = this.navbarStateService.getNavbarToggle();
  }
}
