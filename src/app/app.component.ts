import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { TranslocoService } from '@ngneat/transloco';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { DataTransformationService } from '@core/services/data-transformation.service';
import { NavbarStateService } from '@core/services/state/navbar-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public navbarToggle$: Observable<string>;
  public header = '';
  public siteTitle = 'boilerplate-client-angular';

  private routerEventsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataTransformationService: DataTransformationService,
    private navbarStateService: NavbarStateService,
    private router: Router,
    private titleService: Title,
    private translocoService: TranslocoService,
  ) {
    this.navbarToggle$ = this.navbarStateService.getNavbarToggle();
  }

  public ngOnInit(): void {
    this.setPageTitle();
    this.setPageFocus();
  }

  public ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  private setPageTitle(): void {
    this.routerEventsSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        map((data) => data.title),
        map((title) => this.getRouteNameFromTitle(title)),
        mergeMap((routeName) => this.translateRouteName(routeName)),
      )
      .subscribe((translatedRouteName) => {
        const pageTitle = translatedRouteName
          ? `${this.siteTitle} - ${translatedRouteName}`
          : this.siteTitle;
        this.header = translatedRouteName;
        this.titleService.setTitle(`${pageTitle}`);
      });
  }

  private setPageFocus(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const mainHeader: HTMLElement | null = document.querySelector(
          '#content-container',
        );
        if (mainHeader) {
          mainHeader.focus();
        }
      });
  }

  private getRouteNameFromTitle(title: string): string {
    const routeName =
      typeof title === 'string'
        ? title
        : this.dataTransformationService.concatenateObjValues<string[]>(title);
    return routeName;
  }

  private translateRouteName(routeName: string): Observable<string> {
    // Listen to the language change event to translate with the latest language
    return this.translocoService.langChanges$.pipe(
      switchMap((language) =>
        // Use async selectTranslate to ensure the translation files are loaded
        this.translocoService.selectTranslate<string>(routeName, {}, language),
      ),
    );
  }
}
