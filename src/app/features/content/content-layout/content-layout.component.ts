import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

/**
 * Wrapper component for all `ContentModule` routes.
 */
@Component({
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentLayoutComponent {
  public showSideNav = false;
  public showTopNav = true;

  public toggleSideNav(): boolean {
    this.showSideNav = !this.showSideNav;
    return this.showSideNav;
  }

  public toggleTopNav(): boolean {
    this.showTopNav = !this.showTopNav;
    return this.showTopNav;
  }
}
