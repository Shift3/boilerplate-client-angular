import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injectable, NgModule } from '@angular/core';
import {
  IndividualConfig,
  ToastPackage,
  ToastRef,
  ToastrModule,
} from 'ngx-toastr';

@Injectable()
class MockToastPackage extends ToastPackage {
  constructor() {
    const toastConfig = { toastClass: 'custom-toast' };
    super(
      1,
      toastConfig as IndividualConfig,
      'Test message',
      'Test title',
      'show',
      new ToastRef(null),
    );
  }
}

@NgModule({
  providers: [{ provide: ToastPackage, useClass: MockToastPackage }],
  imports: [BrowserAnimationsModule, ToastrModule.forRoot()],
  exports: [ToastrModule],
})
export class ToastrTestingModule {}
