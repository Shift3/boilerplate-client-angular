import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * This is hopefully a temporary component to trigger the redirect guard,
 * as recommended by the Angular team for now: https://github.com/angular/angular/issues/18605
 */
@Component({
  selector: 'app-redirect',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedirectComponent {}
