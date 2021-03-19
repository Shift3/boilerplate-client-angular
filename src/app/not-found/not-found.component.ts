import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

import { INotFound, NotFound } from '@models/translation/not-found';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  public notFound: INotFound = new NotFound();

  constructor(private location: Location) {}

  public back(): void {
    this.location.back();
  }
}
