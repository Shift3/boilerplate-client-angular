import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormField, IFormField } from '@models/form/form';
import { ISelectField, SelectField } from '@models/form/select';

import { FormService } from '@core/services/form.service';
import {
  IDynamicFormError,
  DynamicFormError,
} from '@models/translation/dynamic-form/error';
import { LanguageStateService } from '@core/services/state/language-state.service';
import { translocoConfigObj } from '@app/transloco/transloco-config';

import { Observable } from 'rxjs';
import { TranslocoConfig } from '@ngneat/transloco';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  // TODO: This is set to the default change detection for now to show validation messages correctly. Switch back when possible.
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FormSelectComponent implements OnInit {
  public activeLangIsDefaultLang$: Observable<boolean>;
  public config: IFormField<ISelectField<unknown>> = new FormField<
    ISelectField<unknown>
  >({ fieldConfig: new SelectField<unknown>() });
  public configLabel: string = '';
  public group: FormGroup = new FormGroup({});
  public translocoConfig: TranslocoConfig = { ...translocoConfigObj };

  constructor(
    private formService: FormService,
    private languageStateService: LanguageStateService,
  ) {}

  ngOnInit() {
    this.setConfigLabel(this.config.label);
    this.activeLangIsDefaultLang$ = this.languageStateService.getActiveLangIsDefaultLang();
  }

  public get formControl(): AbstractControl {
    return this.config.name.split('.').length > 1
      ? this.group.controls[this.config.name]
      : this.group.get(this.config.name);
  }

  public get formErrorValue(): string {
    const property = this.formService.getFormErrorValue(
      this.formControl.errors,
    );

    // TODO: move some of this logic into the FormService since we use it at least twice
    // Hack to set the configLabel to manipulate the control value passed into transloco
    if (property === 'fieldsMismatched') {
      this.setConfigLabel(this.formControl.errors[property].split(' ')[0]);
    } else {
      this.setConfigLabel(this.config.label);
    }

    const dynamicFormErrorTranslationKeys: IDynamicFormError = new DynamicFormError();
    return dynamicFormErrorTranslationKeys[property];
  }

  private setConfigLabel(label: string): void {
    this.configLabel = label;
  }
}
