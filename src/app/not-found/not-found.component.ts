import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

import {
  INotFoundTranslationKey,
  NotFoundTranslationKey,
} from '@models/translation/not-found';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  public notFoundTranslationKeys: INotFoundTranslationKey = new NotFoundTranslationKey();

  constructor(private location: Location) {}

  public back(): void {
    this.location.back();
  }
}
