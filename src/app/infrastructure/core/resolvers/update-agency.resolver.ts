import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { AgencyService } from '../services/api/agency.service';
import { IAgencyDTO } from '@models/agency';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateAgencyResolver implements Resolve<IAgencyDTO> {
  constructor(
    private agencyService: AgencyService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IAgencyDTO> {
    const id: number = route.params.id;
    return this.agencyService.findAgency(id).pipe(
      take(1),
      catchError((error: HttpErrorResponse) => {
        this.navigateOnError();
        return observableThrowError(error);
      }),
    );
  }

  private navigateOnError(): void {
    const message: string = 'unableToLoadAgency';
    this.notificationService.showError([message]);
    this.router.navigateByUrl('/admin/agency-list');
  }
}
