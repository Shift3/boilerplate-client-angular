import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { IConfirmModalConfig } from '@models/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private ngbModalService: NgbModal,
  ) { }

  public openConfirmModal(modalConfig: IConfirmModalConfig): Promise<boolean> {
    const modalRef = this.ngbModalService.open(ConfirmModalComponent);
    modalRef.componentInstance.modalConfig = modalConfig;

    return modalRef.result
      .then((isConfirmed) => (isConfirmed) ? true : false)
      .catch(() => false);
  }
}
