import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataTransformationService } from '@core/services/data-transformation.service';
import { FormService } from '@core/services/form.service';
import { FormConfig, IFormConfig } from '@models/form/form';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  @Input() public formConfig: IFormConfig = new FormConfig();

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public form: FormGroup = new FormGroup({});

  constructor(
    private formService: FormService,
    private dataTransformationService: DataTransformationService,
  ) {}

  public ngOnInit(): void {
    this.form = this.createFormAndPropagateToParent();
  }

  public submit(): void {
    this.emitSubmit.emit();
  }

  private createFormAndPropagateToParent(): FormGroup {
    const form = this.formService.buildForm(this.formConfig);
    this.emitForm.emit(form);

    return form;
  }

  public getObjectProperty(property: string, label: string): string {
    return label?.length
      ? this.dataTransformationService.getObjectProperty(
          `dynamicForm.${property}`,
          label,
        )
      : '';
  }
}
