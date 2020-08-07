import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import {
  take,
  tap,
} from 'rxjs/operators';

import { AuthStateService } from '../services/state/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authStateService: AuthStateService,
    private router: Router,
  ) { }

  public canActivate(): Observable<boolean> {
    return this.authStateService.isLoggedInUser().pipe(
      take(1),
      tap(isLoggedInUser => {
        if (!isLoggedInUser) {
          this.router.navigateByUrl('/auth');
        }
      }),
    );
  }

  public canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
