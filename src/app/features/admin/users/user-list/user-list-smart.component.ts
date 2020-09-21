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
} from 'rxjs/operators';

import { ConfirmModalConfig } from '@models/modal';
import { IUserDTO } from '@models/user';
import { ModalService } from '@core/services/modal.service';
import { UserService } from '@core/services/api/user.service';
import { UserStateService } from '@core/services/state/user-state.service';
import { IRoleGuard } from '@models/role';

@Component({
  selector: 'app-user-list',
  template: `
    <app-user-list-presentation
      [checkRole]="(checkRole$ | async)"
      [loggedInUser]="(loggedInUser$ | async)"
      [userList]="(userList$ | async)"
      (emitDelete)="openDeleteModal($event)"
      (emitResendActivationEmail)="openResendActivationEmailModal($event)"
    ></app-user-list-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListSmartComponent implements OnInit {
  public checkRole$: Observable<IRoleGuard>;
  public emitGetUserList = new EventEmitter<void>();
  public loggedInUser$: Observable<IUserDTO>;
  public userList$: Observable<IUserDTO[]>;

  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private userStateService: UserStateService,
  ) { }

  public ngOnInit(): void {
    this.getUserList();
    this.checkRole$ = this.checkRoleGuard();
    this.loggedInUser$ = this.getLoggedInUser();
  }

  public openDeleteModal(user: IUserDTO): void {
    const modalConfig = new ConfirmModalConfig({
      message: `Delete ${user.firstName} ${user.lastName}?`,
      action: 'Delete',
    });
    this.modalService.openConfirmModal(modalConfig).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.deleteUser(user);
      }
    });
  }

  public openResendActivationEmailModal(user: IUserDTO): void {
    const modalConfig = new ConfirmModalConfig({
      message: `Resend Activation Email to ${user.firstName} ${user.lastName}?`,
      action: 'Resend',
    });
    this.modalService.openConfirmModal(modalConfig).subscribe((result) => {
      if (result) {
        this.resendActivationEmail(user);
      }
    });
  }

  private getLoggedInUser(): Observable<IUserDTO> {
    return this.userStateService.getUserSession();
  }

  private checkRoleGuard(): Observable<IRoleGuard> {
    return this.userStateService.checkRoleGuard();
  }

  private getUserList(): void {
    this.userList$ = merge(this.emitGetUserList).pipe(
      startWith({}),
      switchMap(() => this.userService.getUserList()),
      catchError(() => observableOf([])),
    );
  }

  private deleteUser(user: IUserDTO): void {
    this.userService.deleteUser(user).subscribe(() => this.emitGetUserList.emit());
  }

  private resendActivationEmail(user: IUserDTO): void {
    this.userService.resendActivationEmail(user).subscribe();
  }
}
