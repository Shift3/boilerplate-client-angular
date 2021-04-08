import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from '@core/services/form.service';
import { FormConfig, IFormConfig } from '@models/form/form';
import { LanguageStateService } from '@core/services/state/language-state.service';
import { translocoConfigObj } from '@app/transloco/transloco-config';

import { Observable } from 'rxjs';
import { TranslocoConfig } from '@ngneat/transloco';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  @Input() public formConfig: IFormConfig = new FormConfig();

  @Output() public emitForm = new EventEmitter<FormGroup>();
  @Output() public emitSubmit = new EventEmitter<void>();

  public activeLangIsDefaultLang$: Observable<boolean>;
  public form: FormGroup = new FormGroup({});
  public translocoConfig: TranslocoConfig = Object.assign(
    {},
    translocoConfigObj,
  );

  constructor(
    private formService: FormService,
    private languageStateService: LanguageStateService,
  ) {}

  public ngOnInit(): void {
    this.form = this.createFormAndPropagateToParent();
    this.activeLangIsDefaultLang$ = this.languageStateService.getActiveLangIsDefaultLang();
  }

  public submit(): void {
    this.emitSubmit.emit();
  }

  private createFormAndPropagateToParent(): FormGroup {
    const form = this.formService.buildForm(this.formConfig);
    this.emitForm.emit(form);

    return form;
  }
}
