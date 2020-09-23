import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { SaveCancelButtonConfig } from '@models/form/button';

@Component({
  selector: 'app-save-cancel',
  templateUrl: './save-cancel.component.html',
  styleUrls: ['./save-cancel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveCancelComponent {
  @Input() public buttonConfig: SaveCancelButtonConfig = new SaveCancelButtonConfig();
  @Input() public form: FormGroup = new FormGroup({});
  @Input() public shouldDisable: boolean = false;

  @Output() public emitSave = new EventEmitter<void>();

  constructor(
    private location: Location,
  ) { }

  public cancel(): void {
    this.location.back();
  }

  public save(): void {
    this.emitSave.emit();
  }
}
