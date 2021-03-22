import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalConfig, IConfirmModalConfig } from '@models/modal';

import {
  IConfirmationModal,
  ConfirmationModal,
} from '@models/translation/confirmation-modal';

@Component({
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {
  @Input() public modalConfig: IConfirmModalConfig = new ConfirmModalConfig();

  public confirmationModal: IConfirmationModal = new ConfirmationModal();

  constructor(private activeModal: NgbActiveModal) {}

  public cancel(): void {
    this.activeModal.close();
  }

  public submit(): void {
    this.activeModal.close(this.modalConfig);
  }
}
