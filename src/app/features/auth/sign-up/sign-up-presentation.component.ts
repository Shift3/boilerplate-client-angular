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
  selector: 'app-sign-up-presentation',
  templateUrl: './sign-up-presentation.component.html',
  styleUrls: ['./sign-up-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPresentationComponent {
  @Input() public formConfig: IFormConfig;

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public formTitle: string = 'Sign Up';

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}
