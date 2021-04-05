import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { DynamicTablePopover } from '@models/translation/dynamic-table';
import { IHasTranslation } from '@models/translation/translation';
import { LanguageStateService } from '@core/services/state/language-state.service';
import { LanguageTranslationKey } from '@models/translation/navigation';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectLanguageComponent {
  @Input() public hasTranslationList: IHasTranslation[];

  public popover = new DynamicTablePopover();
  public languageTranslationKeys = new LanguageTranslationKey();

  constructor(private languageStateService: LanguageStateService) {}

  public selectLanguage(languageCode: string) {
    this.languageStateService.setDynamicLanguageForTranslation(languageCode);
  }
}
