import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormInputComponent } from '../components/dynamic-form/components/form-input/form-input.component';
import { FormSelectComponent } from '../components/dynamic-form/components/form-select/form-select.component';
import { IFormField } from '@models/form/form';
import { IInputField } from '@models/form/input';
import { ISelectField } from '@models/form/select';

const components = {
  input: FormInputComponent,
  select: FormSelectComponent,
};

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit, OnDestroy {
  @Input() fieldConfig: IFormField<IInputField & ISelectField>;
  @Input() group: FormGroup;

  private component: ComponentRef<FormInputComponent & FormSelectComponent>;

  constructor(
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) { }

  public ngOnInit(): void {
    this.initializeComponentAndFactory();
  }

  public ngOnDestroy(): void {
    this.component.destroy();
  }

  private initializeComponentAndFactory(): void {
    const component = components[this.fieldConfig.fieldType];
    const factory = this.resolver.resolveComponentFactory<FormInputComponent & FormSelectComponent>(component);
    this.component = this.container.createComponent(factory);
    this.component.instance.config = this.fieldConfig;
    this.component.instance.group = this.group;
  }
}
