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
import { INavigation } from '@models/navigation';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavigationComponent {
  public isMenuCollapsed = true;
  public navLinks: INavigation[] = [
    {
      id: 1,
      label: 'Directory',
      link: '/content',
      icon: 'fa fa-stethoscope',
    },
    {
      id: 2,
      label: 'Users',
      link: '/admin/user-list',
      icon: 'fa fa-users',
    },
    {
      id: 3,
      label: 'Settings',
      link: '/admin/settings',
      icon: 'fa fa-cog',
    },
  ];
  public profileLinks: INavigation[] = [
    {
      id: 1,
      label: 'Profile',
      link: '/user/profile',
    },
    {
      id: 2,
      label: 'Change Password',
      link: '/user/change-password',
    },
  ];

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
    this.authService.logout().subscribe(() => this.router.navigateByUrl('/auth'));
  }
}
