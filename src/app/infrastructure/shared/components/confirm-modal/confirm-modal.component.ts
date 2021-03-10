import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalConfig, IConfirmModalConfig } from '@models/modal';

import { DataTransformationService } from '@core/services/data-transformation.service';

@Component({
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {
  @Input() public modalConfig: IConfirmModalConfig = new ConfirmModalConfig();

  constructor(
    private activeModal: NgbActiveModal,
    private dataTransformationService: DataTransformationService,
  ) {}

  public cancel(): void {
    this.activeModal.close();
  }

  public submit(): void {
    this.activeModal.close(this.modalConfig);
  }

  public getObjectProperty(label: string): string {
    return label?.length
      ? this.dataTransformationService.getObjectProperty(
          'confirmationModal.action',
          label,
        )
      : 'confirmationModal.action.continue';
  }
}
