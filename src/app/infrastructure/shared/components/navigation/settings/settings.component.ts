import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '@core/services/api/auth.service';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import {
  ConfirmModalConfig,
  IConfirmModalConfig,
} from '@models/modal';
import {
  INavigation,
  profileLinkList,
} from '@models/navigation';
import { NavbarStateService } from '@core/services/state/navbar-state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  public profileLinks: INavigation[] = profileLinkList;
  public showTopNav = (localStorage.getItem('navbarToggle') === 'top') ? true : false;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private navbarStateService: NavbarStateService,
    private router: Router,
  ) { }

  public trackByLink(index: number, item: INavigation): number {
    return (item) ? item.id : null;
  }

  public openConfirmModal(): void {
    const modalConfig = new ConfirmModalConfig({
      message: 'This will end your login session.',
      action: 'Log Out',
    });
    const modalRef = this.modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.modalConfig = modalConfig;
    modalRef.result.then((result: IConfirmModalConfig) => {
      if (result) {
        this.signOut();
      }
    });
  }

  public signOut(): void {
    this.authService.logout().subscribe(() => this.router.navigateByUrl('/auth'));
  }

  // Client-side navigation toggles for debugging purposes
  public toggleNavBar(): void {
    this.showTopNav = !this.showTopNav;
    this.navbarStateService.setNavbarToggle(this.showTopNav);
  }
}
