import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Wrapper component for all `ContentModule` routes.
 */
@Component({
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentLayoutComponent { }
