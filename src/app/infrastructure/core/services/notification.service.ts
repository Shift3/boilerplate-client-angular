import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public showSuccess(message: string[]): void {
    alert(message);
  }

  public showError(message: string[]): void {
    alert(message);
  }
}
