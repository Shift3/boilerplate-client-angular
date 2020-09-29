import {
  Pipe,
  PipeTransform,
} from '@angular/core';

interface TrackByFunctionCache {
  [propertyName: string]: <T, U>(index: number, value: T) => U | null;
}

// Since the resultant TrackBy functions are based on a static property name, we
// can cache these Functions across the entire app. No need to generate more than one
// Function for the same property.
const cache: TrackByFunctionCache = Object.create(null);

@Pipe({ name: 'trackByKey' })
export class TrackByKeyPipe implements PipeTransform {
  public transform(key: string): <T, U>(index: number, item: T) => U {
    if (!cache[key]) {
      cache[key] = function trackByProperty<T, U>(index: number, value: T): U | null {
        return (value) ? value[key] as U : null;
      };
    }

    return cache[key];
  }
}
