import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormConfig, IFormConfig } from '@models/form/form';

@Component({
  selector: 'app-user-profile-detail-presentation',
  templateUrl: './user-profile-detail-presentation.component.html',
  styleUrls: ['./user-profile-detail-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileDetailPresentationComponent {
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
