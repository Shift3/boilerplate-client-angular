import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import {
  IConfirmModalConfig,
  IConfirmModalCallback,
} from '@models/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private ngbModalService: NgbModal,
  ) { }

  public openConfirmModal<T>(modalConfig: IConfirmModalConfig, successCallback: IConfirmModalCallback<T>, callbackValue: T = null): void {
    const modalRef = this.ngbModalService.open(ConfirmModalComponent);

    modalRef.componentInstance.modalConfig = modalConfig;
    modalRef.result
      .then((result: IConfirmModalConfig) => {
        if (result) {
          successCallback(callbackValue);
        }
      })
      .then(null, () => {});
  }
}
