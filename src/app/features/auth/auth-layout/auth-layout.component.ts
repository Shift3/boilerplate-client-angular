import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Wrapper component for all `AuthModule` routes.
 */
@Component({
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent { }
