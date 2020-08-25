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
export class UserStateService {
  // Saving user session data in local storage temporarily until session data is revisited.
  public userSession$ = new BehaviorSubject<IUserDTO>(JSON.parse(localStorage.getItem('user')));

  public getUserSession(): Observable<IUserDTO> {
    return this.userSession$.asObservable();
  }

  public setUserSession(user: IUserDTO): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSession$.next(user);
  }

  public resetUserSession(): void {
    this.userSession$.next(null);
  }

  public isAdmin(): Observable<boolean> {
    return this.getUserSession().pipe(
      map((user) => user?.role?.roleName),
      map((roleName) => RoleDTO.isAdminRoleType(roleName)),
    );
  }

  /**
   * Checks the user session for `Super Administrator`, `Admin`, or `Editor` roles.
   */
  public canEdit(): Observable<boolean> {
    return this.getUserSession().pipe(
      map((user) => user?.role?.roleName),
      map((roleName) => RoleDTO.canEdit(roleName)),
    );
  }

  public isLoggedInUser(): Observable<boolean> {
    return this.getUserSession().pipe(
      map((user) => user?.role?.roleName),
      map((roleName) => RoleDTO.isValidRoleType(roleName)),
    );
  }

  public isSelf(userId: number): Observable<boolean> {
    return this.getUserSession().pipe(
      map((user) => user.id === userId),
    );
  }
}
