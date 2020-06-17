import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '@core/services/api/auth.service';
import {
  FormConfig,
  FormField,
  IFormConfig,
} from '@models/form/form';
import { FormService } from '@core/services/form.service';
import {
  IInputField,
  InputField,
} from '@models/form/input';
import { Logger } from '@utils/logger';
import {
  LoginRequest,
  ILoginRequest,
} from '@models/auth';
import { SaveCancelButtonConfig } from '@models/form/button';

@Component({
  template: `
    <app-login-presentation
      [formConfig]="formConfig"
      [token]="(token$ | async)"
      (emitForm)="propagateForm($event)"
      (emitSubmit)="login()"
      (emitLogout)="logout()"
    ></app-login-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginSmartComponent implements OnInit {
  public form: FormGroup;
  public formConfig: IFormConfig = new FormConfig({
    formName: 'form',
    submit: new SaveCancelButtonConfig({save: 'Log In'}),
    controls: [
      new FormField<IInputField>({
        name: 'email',
        fieldType: 'input',
        label: 'Email',
        placeholder: 'Enter your email',
        fieldConfig : new InputField({ inputType: 'email' }),
      }),
      new FormField<IInputField>({
        name: 'password',
        fieldType: 'input',
        label: 'Password',
        placeholder: 'Enter your password',
        fieldConfig : new InputField({ inputType: 'password' }),
      }),
    ],
  });
  public token$: Observable<string>;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.token$ = this.authService.getToken();
  }

  public propagateForm(form: FormGroup): void {
    this.form = form;
  }

  public login(): void {
    const requestPayload = this.buildPayload();
    this.authService.login(requestPayload).subscribe((response) => this.router.navigateByUrl('/content'));
  }

  public logout(): void {
    this.authService.logout().subscribe(() => this.router.navigateByUrl('/auth/logout'));
  }

  private buildPayload(): ILoginRequest {
    const payload = new LoginRequest();
    return this.formService.buildRequestPayload(this.form, payload);
  }
}
