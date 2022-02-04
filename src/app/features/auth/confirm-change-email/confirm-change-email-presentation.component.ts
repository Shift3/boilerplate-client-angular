import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFormConfig, FormConfig } from '@models/form/form';

@Component({
  selector: 'app-confirm-change-email-presentation',
  templateUrl: './confirm-change-email-presentation.component.html',
  styleUrls: ['./confirm-change-email-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmChangeEmailPresentationComponent {
  @Input() formConfig: IFormConfig = new FormConfig({});

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }

}
