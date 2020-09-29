import { Constants } from './constants';

export class Utils {
  /**
   * Displays the original copyright year or the range from that year to the current year.
   */
  static getCopyrightYear(): string {
    return Constants.initialCopyrightYear >= new Date().getFullYear()
      ? `${new Date().getFullYear()}`
      : `${Constants.initialCopyrightYear} - ${new Date().getFullYear()}`;
  }
}
