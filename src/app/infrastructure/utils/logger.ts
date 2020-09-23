/* istanbul ignore file */
/* tslint:disable:no-console */
export class Logger {
  static error<T>(message: T): void {
    console.error(message);
  }
  static info<T>(message: T): void {
    console.info(message);
  }

  static log<T>(message: T): void {
    console.log(message);
  }

  static warn<T>(message: T): void {
    console.warn(message);
  }
}
