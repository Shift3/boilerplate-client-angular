import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { RoleDTO } from '@models/role';
import { IUserDTO } from '@models/user';

/**
 * Maintains active state listeners for authentication and role status.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  public auth$ = new BehaviorSubject<IUserDTO>(JSON.parse(localStorage.getItem('user')));

  public getAuth(): Observable<IUserDTO> {
    return this.auth$.asObservable();
  }

  public setAuth(user: IUserDTO): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.auth$.next(user);
  }

  public resetAuth(): void {
    this.auth$.next(null);
  }

  public isAdmin(): Observable<boolean> {
    return this.getAuth().pipe(
      map((user) => user?.role?.roleName),
      map((roleName) => RoleDTO.isAdminRoleType(roleName)),
    );
  }

  public isLoggedInUser(): Observable<boolean> {
    return this.getAuth().pipe(
      map((user) => user?.role?.roleName),
      map((roleName) => RoleDTO.isRoleType(roleName)),
    );
  }
}
