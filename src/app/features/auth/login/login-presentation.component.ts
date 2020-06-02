import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IFormConfig } from '@models/form/form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-presentation',
  templateUrl: './login-presentation.component.html',
  styleUrls: ['./login-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPresentationComponent {
  @Input() public formConfig: IFormConfig;
  @Input() public token: string = '';

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitLogout = new EventEmitter<void>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public formTitle: string = 'Log In';

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }
  public logout(): void {
    this.emitLogout.emit();
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}