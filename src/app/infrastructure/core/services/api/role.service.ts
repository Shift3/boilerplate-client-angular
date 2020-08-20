import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { environment } from '@env/environment';
import {
  IRoleDTO,
  RoleType,
} from '@models/role';
import {
  ISelectOptions,
  SelectOptions,
} from '@models/form/select';

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

  public getRoleList(): Observable<ISelectOptions<RoleType>[]> {
    const endpoint = `${this.url}`;

    return this.apiService.get<IRoleDTO[]>(endpoint).pipe(
      map((response) => this.mapRoleListToSelect(response)),
    );
  }

   /**
    * Maps the specific `IRoleDTO` properties to the general `name`/`value` properties that `ISelectOptions` expects
    */
  private mapRoleListToSelect(roles: IRoleDTO[]): ISelectOptions<RoleType>[] {
    const selectOptionList: ISelectOptions<RoleType>[] = [];
    roles.forEach((role) => {
      const selectOption: ISelectOptions<RoleType> = new SelectOptions<RoleType>();
      for (const property in selectOption) {
        if (selectOption.hasOwnProperty(property)) {
          if (property === 'value') {
            selectOption[property] = role.id;
          } else if (property === 'name') {
            selectOption[property] = role.roleName;
          }
        }
      }
      selectOptionList.push(selectOption);
    });

    return selectOptionList;
  }
}
