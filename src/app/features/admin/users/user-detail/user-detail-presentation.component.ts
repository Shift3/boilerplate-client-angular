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
  @Input() public formConfig: IFormConfig;
  @Input() public formTitle: string = 'Create User';
  @Input() public user: IUserDTO;

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();


  public propagateForm(form: FormGroup): void {
    this.emitForm.emit(form);
  }

  public submit(): void {
    this.emitSubmit.emit();
  }
}
