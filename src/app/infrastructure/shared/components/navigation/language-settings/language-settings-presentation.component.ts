import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-language-settings-presentation',
  templateUrl: './language-settings-presentation.component.html',
  styleUrls: ['./language-settings-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSettingsPresentationComponent {
  @Input() public activeLanguage: string = '';
  @Input() public availableLanguagesForSelection: string[] = [];
  @Input() public activeLangIsDefaultLang: boolean = true;

  @Output() public emitSelection = new EventEmitter<string>();

  public selectLanguage(language: string): void {
    this.emitSelection.emit(language);
  }

  public getObjectProperty(label: string): string {
    if (label.length === 0) return '';

    return `navigation.languages.${label.toLowerCase()}`;
  }
}
