import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '@core/services/api/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import {
  ConfirmModalConfig,
  IConfirmModalConfig,
} from '@models/modal';
import {
  INavigation,
  navLinkList,
  profileLinkList,
} from '@models/navigation';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationComponent {
  public isMenuCollapsed = true;
  public navLinks: INavigation[] = navLinkList;
  public profileLinks: INavigation[] = profileLinkList;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
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
    this.authService.logout().subscribe();
    this.router.navigateByUrl('/auth');
  }
}
