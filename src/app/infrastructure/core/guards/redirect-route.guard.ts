import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { UserStateService } from '../services/state/user-state.service';

/**
 * Changes root route based on user's role.
 * E.g navigating to `localhost:4200` redirects to `localhost:4200/auth` when not logged in.
 */
@Injectable({
  providedIn: 'root',
})
export class RedirectRouteGuard implements CanActivate {
  constructor(
    private router: Router,
    private userStateService: UserStateService,
  ) {}

  public canActivate(): Observable<UrlTree> {
    return this.userStateService.checkRoleList().pipe(
      take(1),
      map((roleList) => {
        let route = '/auth';
        if (roleList.isAdmin) {
          route = '/admin';
        } else if (roleList.isValid) {
          route = '/content';
        }

        return this.router.parseUrl(route);
      }),
    );
  }
}
