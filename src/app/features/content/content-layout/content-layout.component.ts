import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { NavbarStateService } from '@core/services/state/navbar-state.service';

/**
 * Wrapper component for all `ContentModule` routes.
 */
@Component({
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentLayoutComponent {
  public navbarToggle$: Observable<string>;

  constructor(private navbarStateService: NavbarStateService) {
    this.navbarToggle$ = this.navbarStateService.getNavbarToggle();
  }
}
