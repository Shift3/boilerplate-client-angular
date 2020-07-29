import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';

import {
    Observable,
    of as observableOf,
} from 'rxjs';

import { IUserDTO, UserDTO } from '@models/user';

@Injectable({
  providedIn: 'root',
})
export class CreateUserResolver implements Resolve<IUserDTO> {
    resolve(route: ActivatedRouteSnapshot, stateSnap: RouterStateSnapshot): Observable<IUserDTO> {
        return observableOf(new UserDTO());
    }
}
