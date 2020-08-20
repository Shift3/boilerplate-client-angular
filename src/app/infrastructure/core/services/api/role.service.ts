import { Injectable } from '@angular/core';

import {
  Observable,
  of as observableOf,
} from 'rxjs';
import {
  catchError,
  startWith,
} from 'rxjs/operators';

import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { IRoleDTO } from '@models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private controllerRoute: string = 'roles';
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public getRoleList(): Observable<IRoleDTO[]> {
    const endpoint = `${this.url}`;
    const placeholderRole: IRoleDTO = {
      id: 0,
      roleName: 'Loading',
    };
    const placeHolderRoleList = new Array<IRoleDTO>();
    placeHolderRoleList.push(placeholderRole);

    return this.apiService.get<IRoleDTO[]>(endpoint).pipe(
      startWith(placeHolderRoleList),
      catchError(() => {
        const errorRole: IRoleDTO = {
          id   : 0,
          roleName : 'Error Loading Roles',
        };
        const errorRoleList = new Array<IRoleDTO>();
        errorRoleList.push(errorRole);
        return observableOf(errorRoleList);
      }),
    );
  }
}
