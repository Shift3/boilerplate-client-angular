import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

import { DynamicTablePopover } from '@models/translation/dynamic-table';
import {
  IHasTranslation,
  ISelectedLanguage,
} from '@models/translation/translation';
import { LanguageTranslationKey } from '@models/translation/navigation';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectLanguageComponent {
  @Input() public hasTranslationList: IHasTranslation[];
  @Input() public id: number;

  @Output() public emitSetLanguage = new EventEmitter<ISelectedLanguage>();

  public popover = new DynamicTablePopover();
  public languageTranslationKeys = new LanguageTranslationKey();

  public selectLanguage(languageCode: string): void {
    this.emitSetLanguage.emit({ id: this.id, languageCode });
  }
}
