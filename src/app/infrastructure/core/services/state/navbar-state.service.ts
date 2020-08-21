import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

/**
 * Service to help toggle between navbars in the client. Debug only.
 */
@Injectable({
  providedIn: 'root',
})
export class NavbarStateService {
  private navbar$ = new BehaviorSubject<string>(localStorage.getItem('navbarToggle') || 'top');

  public getNavbarToggle(): Observable<string> {
    return this.navbar$.asObservable();
  }

  public setNavbarToggle(isTop: boolean): void {
    const toggle = (isTop) ? 'top' : 'side';
    localStorage.setItem('navbarToggle', toggle);
    this.navbar$.next(toggle);
  }

  public resetNavbarToggle(): void {
    this.navbar$.next('top');
  }
}
