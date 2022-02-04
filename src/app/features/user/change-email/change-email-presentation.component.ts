import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormConfig, IFormConfig } from '@models/form/form';
import { IUserDTO } from '@models/user';

@Component({
  selector: 'app-change-email-presentation',
  templateUrl: './change-email-presentation.component.html',
  styleUrls: ['./change-email-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeEmailPresentationComponent implements OnInit {
  @Input() formConfig: IFormConfig = new FormConfig({});
  @Input() user: IUserDTO;

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();
  @Output() public emitResendVerificationEmail = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }

  public resendVerificationEmail(): void {
    this.emitResendVerificationEmail.emit();
  }
}
