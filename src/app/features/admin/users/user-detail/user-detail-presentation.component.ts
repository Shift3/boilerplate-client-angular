import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IFormConfig } from '@models/form/form';
import { FormGroup } from '@angular/forms';


import { IUserDTO } from '@models/user';

@Component({
  selector: 'app-user-detail-presentation',
  templateUrl: './user-detail-presentation.component.html',
  styleUrls: ['./user-detail-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailPresentationComponent {
  @Input() public user: IUserDTO;
  @Input() public formConfig: IFormConfig;

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public formTitle: string = 'Create User';

  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}
