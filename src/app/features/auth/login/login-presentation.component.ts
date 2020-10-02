import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { FormConfig, IFormConfig } from '@models/form/form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-presentation',
  templateUrl: './login-presentation.component.html',
  styleUrls: ['./login-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPresentationComponent {
  @Input() public formConfig: IFormConfig = new FormConfig();

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public formTitle: string = 'Member Log In';

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}
