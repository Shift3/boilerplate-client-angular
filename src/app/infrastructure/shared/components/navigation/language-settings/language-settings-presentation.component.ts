import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  ILanguageTranslationKey,
  LanguageTranslationKey,
} from '@models/translation/navigation';
import { translocoConfigObj } from '@app/transloco/transloco-config';

@Component({
  selector: 'app-language-settings-presentation',
  templateUrl: './language-settings-presentation.component.html',
  styleUrls: ['./language-settings-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSettingsPresentationComponent {
  @Input() public activeLanguage: string = translocoConfigObj.defaultLang;
  @Input() public availableLanguagesForSelection: string[] = [];
  @Input() public activeLangIsDefaultLang: boolean = true;

  @Output() public emitSelection = new EventEmitter<string>();

  public languageTranslationKeys: ILanguageTranslationKey = new LanguageTranslationKey();

  public selectLanguage(language: string): void {
    this.emitSelection.emit(language);
  }
}
