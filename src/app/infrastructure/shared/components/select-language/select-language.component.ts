import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { AgentDTO, IAgentDTO } from '@models/agent';
import { DynamicTablePopover } from '@models/translation/dynamic-table';
import { LanguageTranslationKey } from '@models/translation/navigation';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectLanguageComponent {
  @Input() public agent: IAgentDTO = new AgentDTO();

  @Output() public emitSelectLanguage = new EventEmitter<string>();

  public popover = new DynamicTablePopover();
  public languageTranslationKeys = new LanguageTranslationKey();

  public selectLanguage(languageCode: string) {
    this.emitSelectLanguage.emit(languageCode);
  }
}
