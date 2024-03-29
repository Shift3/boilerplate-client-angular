import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRoleCheck, RoleDTO, RoleCheck } from '@models/role';
import { IUserDTO, UserDTO } from '@models/user';

/**
 * Maintains active state listeners for authentication and role status.
 */
@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  // Saving user session data in local storage temporarily until session data is revisited.
  public userSession$ = new BehaviorSubject<IUserDTO>(
    JSON.parse(localStorage.getItem('user')),
  );

  public getUserSession(): Observable<IUserDTO> {
    return this.userSession$.asObservable();
  }

  public setUserSession(user: IUserDTO): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSession$.next(user);
  }

  public resetUserSession(): void {
    this.userSession$.next(new UserDTO());
  }

  /**
   * Combined state stream to listen to multiple role states.
   */
  public checkRoleList(): Observable<IRoleCheck> {
    return this.getUserSession().pipe(
      map((user) => user?.role?.roleName),
      map((roleName) => {
        const roleList: IRoleCheck = new RoleCheck({
          canEdit: RoleDTO.canEdit(roleName),
          isAdmin: RoleDTO.isAdminRoleType(roleName),
          isValid: RoleDTO.isValidRoleType(roleName),
          isSuperAdmin: RoleDTO.isSuperAdminRoleType(roleName),
        });
        return roleList;
      }),
    );
  }

  public isSelf(userId: number): Observable<boolean> {
    return this.getUserSession().pipe(map((user) => user?.id === userId));
  }
}
