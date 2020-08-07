import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import {
  map,
  take,
} from 'rxjs/operators';

import { AuthStateService } from '../services/state/auth-state.service';
import { RoleDTO } from '@models/role';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authStateService: AuthStateService,
    private router: Router,
  ) { }

  public canActivate(): Observable<boolean> {
    return this.authStateService.getAuth().pipe(
      take(1),
      map((user) => {
        if (RoleDTO.isRoleType(user?.role?.roleName)) {
          return true;
        }
        this.router.navigateByUrl('/auth');
        return false;
      }),
    );
  }

  public canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
