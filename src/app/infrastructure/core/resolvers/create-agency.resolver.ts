import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import {
  Observable,
  of as observableOf,
} from 'rxjs';

import {
  AgencyDTO,
  IAgencyDTO,
} from '@models/agency';

@Injectable({
  providedIn: 'root',
})
export class CreateAgencyResolver implements Resolve<IAgencyDTO> {
  resolve(): Observable<IAgencyDTO> {
    return observableOf(new AgencyDTO());
  }
}
