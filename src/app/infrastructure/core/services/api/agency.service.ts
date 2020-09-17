import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import {
  IAgencyDTO,
  IAgencyRequest,
} from '@models/agency';
import { environment } from '@env/environment';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private controllerRoute: string = 'agencies';
  private url: string = `${environment.apiRoute}`;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
  ) {
    this.url = `${environment.apiRoute}/${this.controllerRoute}`;
  }

  public getAgencyList(): Observable<IAgencyDTO[]> {
    const endpoint = `${this.url}`;

    return this.apiService.get(endpoint);
  }

  public findAgency(id: number): Observable<IAgencyDTO> {
    const endpoint = `${this.url}/${id}`;

    return this.apiService.get<IAgencyDTO>(endpoint);
  }

  public createAgency(payload: IAgencyRequest): Observable<IAgencyDTO> {
    const endpoint = `${this.url}`;

    return this.apiService.post<IAgencyDTO, IAgencyRequest>(endpoint, payload).pipe(
      tap(() => {
        const message = `Agency created.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }

  public updateAgency(payload: IAgencyRequest, agencyId: number): Observable<IAgencyDTO> {
    const endpoint = `${this.url}/${agencyId}`;

    return this.apiService.put<IAgencyDTO, IAgencyRequest>(endpoint, payload).pipe(
      tap(() => {
        const message = `Agency updated.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }

  public deleteAgency(agency: IAgencyDTO): Observable<IAgencyDTO> {
    const endpoint = `${this.url}/${agency.id}`;

    return this.apiService.delete<IAgencyDTO>(endpoint).pipe(
      tap(() => {
        const message = `Agency deleted.`;
        return this.notificationService.showSuccess([message]);
      }),
    );
  }
}
