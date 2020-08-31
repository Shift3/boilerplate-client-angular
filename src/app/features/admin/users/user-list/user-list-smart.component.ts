import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import {
  ConfirmModalConfig,
  IConfirmModalConfig,
} from '@models/modal';
import { IUserDTO } from '@models/user';
import { UserService } from '@core/services/api/user.service';
import { UserStateService } from '@core/services/state/user-state.service';

@Component({
  template: `
    <app-user-list-presentation
      [loggedInUser]="(loggedInUser$ | async)"
      [userList]="(userList$ | async)"
      (emitDelete)="openDeleteModal($event)"
    ></app-user-list-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListSmartComponent implements OnInit {
  public userList$: Observable<IUserDTO[]>;
  public emitGetUserList = new EventEmitter<void>();
  public isLoaded: boolean = false;
  public isLoadingResults: boolean = false;
  public loggedInUser$: Observable<IUserDTO>;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private userStateService: UserStateService,
  ) { }

  public ngOnInit(): void {
    this.getUserList();
    this.loggedInUser$ = this.getLoggedInUser();
  }

  public openDeleteModal(user: IUserDTO): void {
    const modalConfig = new ConfirmModalConfig({
      message: `Delete ${user.firstName} ${user.lastName}?`,
      action: 'Delete',
    });
    const modalRef = this.modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.modalConfig = modalConfig;
    modalRef.result.then((result: IConfirmModalConfig) => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }

  private getLoggedInUser(): Observable<IUserDTO> {
    return this.userStateService.getUserSession();
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

  private deleteUser(user: IUserDTO): void {
    this.userService.deleteUser(user).subscribe(() => this.emitGetUserList.emit());
  }
}
