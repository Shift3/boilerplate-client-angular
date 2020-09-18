import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private toastr: ToastrService,
  ) { }
  public showSuccess(messageList: string[]): void {
    this.toastr.success(messageList[0]);
  }

  public showError(messageList: string[]): void {
    this.toastr.error(messageList[0]);
  }
}
