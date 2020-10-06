import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { IRoleDTO } from '@models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private controllerRoute: string = 'roles';
  private url: string = `${environment.apiRoute}`;

  constructor(private apiService: ApiService) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public getRoleList(): Observable<IRoleDTO[]> {
    const endpoint = `${this.url}`;

    return this.apiService.get<IRoleDTO[]>(endpoint);
  }
}
