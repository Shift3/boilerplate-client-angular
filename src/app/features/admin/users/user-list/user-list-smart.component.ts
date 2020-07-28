import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';

import {
  merge,
  Observable,
  of as observableOf,
} from 'rxjs';
import {
  catchError,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import {
  IUserDTO,
} from '@models/user';
import { UserService } from '@core/services/api/user.service';

@Component({
  template: `
    <app-user-list-presentation
      [userList]="(userList$ | async)"
    ></app-user-list-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListSmartComponent implements OnInit {
  public userList$: Observable<IUserDTO[]>;
  public emitGetUserList = new EventEmitter<void>();
  public isLoaded: boolean = false;
  public isLoadingResults: boolean = false;

  constructor(
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.getUserList();
  }

  private getUserList(): void {
    this.userList$ = merge(this.emitGetUserList).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.userService.getUserList();
      }),
      tap(() => this.isLoaded = true),
      tap(() => this.isLoadingResults = false),
      catchError(() => {
        this.isLoadingResults = false;
        return observableOf([]);
      }),
    );
  }
}
