import { Injectable, NgZone } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { LanguageStateService } from '@core/services/state/language-state.service';
import { Message } from '@models/message';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private languageStateService: LanguageStateService,
    private toastr: ToastrService,
    private zone: NgZone,
  ) {}

  public showSuccess(
    messageList: Message[],
    isServerTranslated: boolean = false,
  ): void {
    const formattedMessage = this.formatMessageList(
      messageList,
      isServerTranslated,
    );
    // Wrap notification call in zone invocation to fix rendering inconsistencies when using `Injector`
    this.zone.run(() => {
      this.toastr.success(formattedMessage, '', { enableHtml: true });
    });
  }

  public showError(
    messageList: Message[],
    isServerTranslated: boolean = false,
  ): void {
    const formattedMessage = this.formatMessageList(
      messageList,
      isServerTranslated,
    );
    // Wrap notification call in zone invocation to fix rendering inconsistencies when using `Injector`
    this.zone.run(() => {
      this.toastr.error(formattedMessage, '', {
        enableHtml: true,
        timeOut: 10000,
      });
    });
  }

  private formatMessageList(
    messageList: Message[],
    isServerTranslated: boolean = false,
  ): string {
    const translatedMessageList: string[] = this.translateMessageList(
      messageList,
      isServerTranslated,
    );
    return translatedMessageList.join('<br />');
  }

  private translateMessageList(
    messageList: Message[],
    isServerTranslated: boolean = false,
  ): string[] {
    return messageList.map((message: Message) => {
      if (message.type === 'static' && !isServerTranslated)
        return this.languageStateService.getTranslation(message.message);

      return message.message;
    });
  }
}
