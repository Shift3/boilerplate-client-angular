import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Observable } from 'rxjs';

import { NavbarStateService } from '@core/services/state/navbar-state.service';


/**
 * Wrapper component for all `AdminModule` routes.
 */
@Component({
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  public navbarToggle$: Observable<string>;

  constructor(
    private navbarStateService: NavbarStateService,
  ) {
    this.navbarToggle$ = this.navbarStateService.getNavbarToggle();
  }
}
