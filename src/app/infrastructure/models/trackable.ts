import { Logger } from '@utils/logger';

export class Trackable {
  public key: string;

  constructor(key?: string) {
    this.key = key || 'id';
  }

  /**
   * Helps index an `*ngFor` iterator. Must be provided a valid key.
   */
  public trackByKey<T, U>(index: number, value: T): U | null {
    if (value[this.key] === undefined) {
      Logger.warn('Key not provided to trackByKey() for *ngFor.');
    }
    return (value) ? value[this.key] as U : null;
  }
}
