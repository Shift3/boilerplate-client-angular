import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';

import {
  Observable,
  of as observableOf,
} from 'rxjs';

import { AuthStateService } from '../services/state/auth-state.service';
import { RoleDTO } from '@models/role';
import { IUserDTO } from '@models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authStateService: AuthStateService,
    private router: Router,
  ) { }

  public canActivate(): Observable<boolean> {
    const user: IUserDTO = this.authStateService.getAuthValue();
    if (RoleDTO.isRoleType(user?.role?.roleName)) {
      return observableOf(true);
    }

    this.router.navigateByUrl('/auth');
    return observableOf(false);
  }

  public canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
