import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { IAgencyDTO } from '@models/agency';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private controllerRoute: string = 'agencies';
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public getAgencyList(): Observable<IAgencyDTO[]> {
    const endpoint = `${this.url}`;

    return this.apiService.get(endpoint);
  }
}
