import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public getClientMessage(error: Error): string[] {
    const errorList: string[] = [];
    if (!navigator.onLine) {
      errorList.push('No Internet Connection.');
      return errorList;
    }
    error.message
      ? errorList.push(error.message)
      : errorList.push(error.toString());
    return errorList;
  }

  public getServerMessage(error: HttpErrorResponse): string[] {
    const errorList: string[] = [];
    if (error && error.error) {
      errorList.push(error.error.message);
    } else {
      errorList.push('Unable to complete request.');
    }
    return errorList;
  }
}
