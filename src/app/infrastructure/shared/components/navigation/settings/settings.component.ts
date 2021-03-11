import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/api/auth.service';
import { ConfirmModalConfig } from '@models/modal';
import { ModalService } from '@core/services/modal.service';
import { INavigation, profileLinkList } from '@models/navigation';
import { NavbarStateService } from '@core/services/state/navbar-state.service';
import { DataTransformationService } from '@app/infrastructure/core/services/data-transformation.service';
import { IUserDTO, UserDTO } from '@models/user';

interface IDefaultLangText {
  toggleNavBarText: string;
  signOutText: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  @Input() loggedInUser: IUserDTO = new UserDTO();
  @Input() activeLangIsDefaultLang: boolean;
  public defaultLangText: IDefaultLangText;
  public profilePicturePlaceholder = `assets/img/portrait_placeholder.png`;
  public profileLinks: INavigation[] = profileLinkList;
  public showTopNav =
    localStorage.getItem('navbarToggle') === 'top' ? true : false;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private navbarStateService: NavbarStateService,
    private router: Router,
    private dataTransformationService: DataTransformationService,
  ) {}

  ngOnInit() {
    this.languageSetup();
  }

  private languageSetup() {
    this.defaultLangText = {
      toggleNavBarText: this.dataTransformationService.getTextInDefaultLang(
        'userProfile',
        'toggleNavBarText',
      ),
      signOutText: this.dataTransformationService.getTextInDefaultLang(
        'userProfile',
        'signOutText',
      ),
    };
  }

  public openConfirmModal(): void {
    const modalConfig = new ConfirmModalConfig({
      message: {
        static: 'This will end your login session.',
      },
      action: 'Log Out',
    });
    this.modalService.openConfirmModal(modalConfig).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.signOut();
      }
    });
  }

  public signOut(): void {
    this.authService.logout().subscribe();
    this.router.navigateByUrl('/auth');
  }

  // Client-side navigation toggles for debugging purposes
  public toggleNavBar(): void {
    this.showTopNav = !this.showTopNav;
    this.navbarStateService.setNavbarToggle(this.showTopNav);
  }

  public showPlaceholderImageOnEmptyOrError(): void {
    this.loggedInUser.profilePicture = this.profilePicturePlaceholder;
  }

  public getObjectProperty(label: string): string {
    if (label?.length)
      return this.dataTransformationService.getObjectProperty(
        'userProfile.profileLinks',
        label,
      );
  }
}
