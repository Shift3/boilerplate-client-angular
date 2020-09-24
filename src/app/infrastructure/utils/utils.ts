import { Constants } from './constants';
import { Logger } from './logger';

export class Utils {
  /**
   * Displays the original copyright year or the range from that year to the current year.
   */
  static getCopyrightYear(): string {
    return Constants.initialCopyrightYear >= new Date().getFullYear()
      ? `${new Date().getFullYear()}`
      : `${Constants.initialCopyrightYear} - ${new Date().getFullYear()}`;
  }

  /**
   * Helps index an `*ngFor` iterator. Must be provided a valid key.
   */
  static trackByValue<T, U>(index: number, value: T, key: string): U | null {
    if (value[key] === undefined) {
      Logger.warn('Key not provided to trackByValue() for *ngFor.');
    }
    return (value) ? value[key] as U : null;
  }
}
