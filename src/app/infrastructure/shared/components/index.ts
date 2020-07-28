import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormInputComponent } from './dynamic-form/components/form-input/form-input.component';
import { FormSelectComponent } from './dynamic-form/components/form-select/form-select.component';
import { SaveCancelComponent } from './save-cancel/save-cancel.component';
import { SideNavigationComponent } from './navigation/side-navigation/side-navigation.component';
import { TopNavigationComponent } from './navigation/top-navigation/top-navigation.component';
import { SettingsComponent } from './navigation/settings/settings.component';

/**
 * Add components that do not need to be specifically referenced.
 */
export const components = [
  ConfirmModalComponent,
  DynamicFormComponent,
  FormInputComponent,
  FormSelectComponent,
  SaveCancelComponent,
  SettingsComponent,
  SideNavigationComponent,
  TopNavigationComponent,
];
