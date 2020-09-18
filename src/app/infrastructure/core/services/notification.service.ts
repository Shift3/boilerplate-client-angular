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
    const formattedMessage = this.formatMessageList(messageList);
    this.toastr.success(formattedMessage, '', { enableHtml: true });
  }

  public showError(messageList: string[]): void {
    const formattedMessage = this.formatMessageList(messageList);
    this.toastr.error(formattedMessage, '', { enableHtml: true });
  }

  private formatMessageList(messageList: string[]): string {
    return messageList.join('<br />');
  }
}
