import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { DataTransformationService } from '@core/services/data-transformation.service';
import { SaveCancelButtonConfig } from '@models/form/button';

@Component({
  selector: 'app-save-cancel',
  templateUrl: './save-cancel.component.html',
  styleUrls: ['./save-cancel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveCancelComponent {
  @Input()
  public buttonConfig: SaveCancelButtonConfig = new SaveCancelButtonConfig();
  @Input() public form: FormGroup = new FormGroup({});
  @Input() public shouldDisable: boolean = false;

  @Output() public emitSave = new EventEmitter<void>();

  constructor(
    private location: Location,
    private dataTransformationService: DataTransformationService,
  ) {}

  public cancel(): void {
    this.location.back();
  }

  public save(): void {
    this.emitSave.emit();
  }

  public getObjectProperty(buttonLabel: string): string {
    return this.dataTransformationService.getObjectProperty(
      'dynamicForm.action',
      buttonLabel,
    );
  }
}
