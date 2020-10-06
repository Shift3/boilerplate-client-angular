import { Injectable, NgZone } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService, private zone: NgZone) {}
  public showSuccess(messageList: string[]): void {
    const formattedMessage = this.formatMessageList(messageList);
    // Wrap notification call in zone invocation to fix rendering inconsistencies when using `Injector`
    this.zone.run(() => {
      this.toastr.success(formattedMessage, '', { enableHtml: true });
    });
  }

  public showError(messageList: string[]): void {
    const formattedMessage = this.formatMessageList(messageList);
    // Wrap notification call in zone invocation to fix rendering inconsistencies when using `Injector`
    this.zone.run(() => {
      this.toastr.error(formattedMessage, '', {
        enableHtml: true,
        timeOut: 10000,
      });
    });
  }

  private formatMessageList(messageList: string[]): string {
    return messageList.join('<br />');
  }
}
